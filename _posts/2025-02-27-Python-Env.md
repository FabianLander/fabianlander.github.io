---
layout: post
title: "Working with Python Virtual Environments for PyTorch"
date: 2025-02-27 08:00:00 +0100
categories: machine-learning python
permalink: "python-envs"
excerpt: "A practical guide to creating and using Python virtual environments for PyTorch development."
---

This guide provides a hands-on approach to setting up Python environments for PyTorch development.

## Quick Start: Complete PyTorch Environment

```bash
# 1. Create and activate environment
python3 -m venv pytorch-env
source pytorch-env/bin/activate  # On Windows: pytorch-env\Scripts\activate

# 2. Install PyTorch with CUDA support
pip install --upgrade pip
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121

# 3. Install common data science packages
pip install jupyter numpy pandas matplotlib scikit-learn tensorboard

# 4. Verify GPU access
python -c "import torch; print('CUDA available:', torch.cuda.is_available()); print('GPU:', torch.cuda.get_device_name(0) if torch.cuda.is_available() else 'None')"
```

## Test Drive: CPU vs GPU Performance

Save this script as `gpu_benchmark.py` to see the dramatic speedup GPUs provide:

```python
import torch
import torch.nn as nn
import torch.optim as optim
import torchvision
import torchvision.transforms as transforms
import time
import matplotlib.pyplot as plt

# Device detection - works with NVIDIA and Apple Silicon GPUs
print(f"PyTorch version: {torch.__version__}")
has_cuda = torch.cuda.is_available()
has_mps = hasattr(torch.backends, "mps") and torch.backends.mps.is_available()

if has_cuda:
    device = torch.device("cuda")
    print(f"CUDA GPU available: {torch.cuda.get_device_name(0)}")
elif has_mps:
    device = torch.device("mps")
    print("Apple Silicon GPU available (MPS)")
else:
    device = torch.device("cpu")
    print("No GPU detected - using CPU")

# CNN model for MNIST - GPUs excel at these parallel operations
class ConvNet(nn.Module):
    def __init__(self):
        super(ConvNet, self).__init__()
        self.conv1 = nn.Conv2d(1, 32, 3)
        self.pool = nn.MaxPool2d(2, 2)
        self.conv2 = nn.Conv2d(32, 64, 3)
        self.fc1 = nn.Linear(64 * 5 * 5, 128)
        self.dropout = nn.Dropout(0.5)
        self.fc2 = nn.Linear(128, 10)
        
    def forward(self, x):
        x = self.pool(torch.relu(self.conv1(x)))
        x = self.pool(torch.relu(self.conv2(x)))
        x = x.view(-1, 64 * 5 * 5)
        x = torch.relu(self.fc1(x))
        x = self.dropout(x)
        return self.fc2(x)

# Training function with timing
def train_model(device_name):
    dev = torch.device(device_name)
    print(f"\nTraining on {device_name}")
    
    model = ConvNet().to(dev)
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=0.001)
    
    start_time = time.time()
    epochs = 3
    
    for epoch in range(epochs):
        model.train()
        running_loss = 0.0
        correct = 0
        total = 0
        
        for i, (inputs, labels) in enumerate(trainloader):
            inputs, labels = inputs.to(dev), labels.to(dev)
            
            optimizer.zero_grad()
            outputs = model(inputs)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()
            
            running_loss += loss.item()
            _, predicted = torch.max(outputs.data, 1)
            total += labels.size(0)
            correct += (predicted == labels).sum().item()
            
            if i % 50 == 49:
                print(f'Epoch {epoch+1}, Batch {i+1}, Loss: {running_loss/50:.3f}, Acc: {100*correct/total:.1f}%')
                running_loss = 0.0
    
    total_time = time.time() - start_time
    print(f"Training on {device_name} took {total_time:.2f} seconds")
    return total_time

# Additionally benchmark large matrix multiplication
def benchmark_matrix():
    print("\n--- Matrix Operations Benchmark ---")
    # Large matrices benefit tremendously from GPU
    size = 5000
    a = torch.randn(size, size)
    b = torch.randn(size, size)
    
    # CPU timing
    cpu_start = time.time()
    _ = torch.matmul(a, b)
    cpu_time = time.time() - cpu_start
    print(f"CPU matrix multiplication: {cpu_time:.2f} seconds")
    
    # Skip if no GPU
    if device.type == "cpu":
        return
        
    # GPU timing
    a_gpu = a.to(device)
    b_gpu = b.to(device)
    
    # Warmup run
    _ = torch.matmul(a_gpu, b_gpu)
    if has_cuda:
        torch.cuda.synchronize()
    elif has_mps:
        torch.mps.synchronize()
    
    # Timed run
    gpu_start = time.time()
    _ = torch.matmul(a_gpu, b_gpu)
    if has_cuda:
        torch.cuda.synchronize()
    elif has_mps:
        torch.mps.synchronize()
    gpu_time = time.time() - gpu_start
    
    print(f"GPU matrix multiplication: {gpu_time:.2f} seconds")
    print(f"Speedup: {cpu_time/gpu_time:.1f}x faster on GPU")

# Prepare data (use subset for quick demo)
transform = transforms.Compose([transforms.ToTensor(), transforms.Normalize((0.5,), (0.5,))])
mnist_train = torchvision.datasets.MNIST(root='./data', train=True, download=True, transform=transform)
subset_train = torch.utils.data.Subset(mnist_train, range(10000))  # Use 10k examples
trainloader = torch.utils.data.DataLoader(subset_train, batch_size=128, shuffle=True, num_workers=2)

# Run model training benchmark
cpu_time = train_model("cpu")

if device.type != "cpu":
    gpu_time = train_model(device.type)
    speedup = cpu_time / gpu_time
    print(f"\nGPU is {speedup:.1f}x faster than CPU for training")

# Run matrix multiplication benchmark
benchmark_matrix()

# Cleanup
if has_cuda:
    torch.cuda.empty_cache()
```

Run with: `python gpu_benchmark.py`

On our hardware (NVIDIA RTX 4000 Ada Generation), this example typically shows a 17x speedup on GPU.

## Essential Environment Commands

### Creating & Managing Environments

```bash
# Create a new environment
python3 -m venv env_name

# Activate/Deactivate
source env_name/bin/activate  # Linux/macOS
env_name\Scripts\activate     # Windows
deactivate                    # Any platform

# Check active environment
which python
echo $VIRTUAL_ENV
```

### Package Management

```bash
# Install packages
pip install package_name
pip install package_name==1.2.3
pip install -r requirements.txt

# List packages
pip list
pip freeze > requirements.txt
```

## Working with Jupyter

```bash
# Launch from activated environment
jupyter notebook

# Install packages from notebook
%pip install package_name

# To use GPU in notebook
device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
tensor = torch.rand(1000, 1000).to(device)  # Moves data to GPU if available
```

## Running Scripts

```bash
# Basic execution
python script.py

# Background execution
nohup python train.py &  # Output to nohup.out

# Using screen for detachable sessions
screen -S training
# Run script, then detach with Ctrl+A, D
# Reattach with: screen -r training
```

## Best Practices

1. **Create dedicated environments** for different projects
2. **Document dependencies**: `pip freeze > requirements.txt`
3. **Update pip** after creating new environments
4. **Use consistent environment naming**: `project-framework-purpose`
5. **Script structure**:
   ```python
   if __name__ == "__main__":
       # Entry point code here
       main()
   ```
6. **Use argparse** for configurable scripts
   ```python
   import argparse
   parser = argparse.ArgumentParser()
   parser.add_argument('--epochs', type=int, default=10)
   args = parser.parse_args()
   ```

This concise guide should help you quickly set up and effectively work with PyTorch in Python virtual environments.