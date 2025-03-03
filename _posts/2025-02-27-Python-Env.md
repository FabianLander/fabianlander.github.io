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

Save this script as `mnist_test.py` to compare training speed:

```python
import time
import torch
import torch.nn as nn
import torch.optim as optim
import torchvision
import torchvision.transforms as transforms

# Device configuration
device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
print(f"Using device: {device}")

# Simple neural network
class SimpleNN(nn.Module):
    def __init__(self):
        super(SimpleNN, self).__init__()
        self.flatten = nn.Flatten()
        self.layers = nn.Sequential(
            nn.Linear(28*28, 512),
            nn.ReLU(),
            nn.Linear(512, 512),
            nn.ReLU(),
            nn.Linear(512, 10)
        )

    def forward(self, x):
        x = self.flatten(x)
        return self.layers(x)

# Load MNIST dataset
transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize((0.1307,), (0.3081,))
])

train_dataset = torchvision.datasets.MNIST(root='./data', train=True, 
                                           download=True, transform=transform)
train_loader = torch.utils.data.DataLoader(train_dataset, batch_size=64, shuffle=True)

# Training function
def train_model(device_type):
    model = SimpleNN().to(device_type)
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.SGD(model.parameters(), lr=0.01, momentum=0.9)
    
    start_time = time.time()
    
    model.train()
    for batch_idx, (data, target) in enumerate(train_loader):
        data, target = data.to(device_type), target.to(device_type)
        
        optimizer.zero_grad()
        output = model(data)
        loss = criterion(output, target)
        loss.backward()
        optimizer.step()
        
        if batch_idx % 100 == 0:
            print(f'Device: {device_type}, Batch: {batch_idx}/{len(train_loader)}, Loss: {loss.item():.6f}')
            
    total_time = time.time() - start_time
    print(f"Training on {device_type} took {total_time:.2f} seconds")
    return total_time

# Run comparison
print("\n--- CPU Training ---")
cpu_time = train_model(torch.device("cpu"))

if torch.cuda.is_available():
    print("\n--- GPU Training ---")
    gpu_time = train_model(torch.device("cuda:0"))
    print(f"\nGPU is {cpu_time/gpu_time:.2f}x faster than CPU")
else:
    print("\nGPU not available for comparison")
```

Run with: `python mnist_test.py`

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