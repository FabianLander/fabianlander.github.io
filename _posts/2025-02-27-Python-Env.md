---
layout: post
title: "Working with Python Virtual Environments"
date: 2025-02-27
 08:00:00 +0100
categories: machine-learning python
permalink: "python-envs"
excerpt: "This guide covers the essential commands for creating and managing Python virtual environments."
---


This guide covers the essential commands for creating and managing Python virtual environments.

## Creating and Activating Environments

### Create a new environment
```bash
# Basic syntax
python3 -m venv environment_name

# Examples
python3 -m venv pytorch-env
python3 -m venv ml-project
python3 -m venv .venv  # Hidden directory (common in projects)
```

### Activate an environment
```bash
# On Linux/macOS
source environment_name/bin/activate

# On Windows
environment_name\Scripts\activate
```

Once activated, your command prompt will change to show the active environment:
```
(pytorch-env) username@hostname:~$
```

### Deactivate an environment
When you're done working, deactivate the environment:
```bash
deactivate
```

## Managing Environments

### See which environment is active
```bash
# Look at your command prompt - it should show (env_name)

# Check Python path
which python

# Check environment variable
echo $VIRTUAL_ENV
```

### List all environments
Python doesn't provide a built-in command to list all environments, but you can:
```bash
# List directories in a common location where you store environments
ls ~/environments/

# Or use find to search for pyvenv.cfg files which indicate virtual environments
find ~ -name pyvenv.cfg -exec dirname {} \;
```

## Working with Packages

### List installed packages
```bash
# List all packages in the current environment
pip list

# Generate a requirements.txt file
pip freeze > requirements.txt
```

### Install packages
```bash
# Install a single package
pip install package_name

# Install with specific version
pip install package_name==1.2.3

# Install multiple packages
pip install package1 package2 package3

# Install from requirements.txt
pip install -r requirements.txt
```

### Example: Setting up a Jupyter environment
```bash
# Create and activate environment
python3 -m venv jupyter-env
source jupyter-env/bin/activate

# Install Jupyter and common data science packages
pip install jupyter numpy pandas matplotlib scikit-learn

# Install PyTorch with CUDA support
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121

# Register the environment with Jupyter
python -m ipykernel install --user --name=jupyter-env --display-name="Python (Jupyter Env)"
```

## Using Jupyter Notebooks

### Launch Jupyter Notebook
```bash
# Make sure your environment is activated
jupyter notebook
```
This will start the Jupyter server and open your browser to the Jupyter interface.

### Install packages from within Jupyter
You can install packages directly from a notebook cell:
```python
# Using % magic (recommended)
%pip install package_name

# Or using shell command
!pip install package_name
```

### Switching kernels
If you have multiple environments registered as Jupyter kernels:
1. Open a notebook
2. Click on "Kernel" in the top menu
3. Select "Change kernel"
4. Choose your environment from the list

## Best Practices

1. **Create dedicated environments for different projects** to avoid dependency conflicts
2. **Document your dependencies** with `pip freeze > requirements.txt`
3. **Name environments descriptively** (e.g., `django-web-app`, `ml-research`)
4. **Clean up unused environments** to save disk space: `rm -rf environment_name`
5. **Update pip** after creating a new environment: `pip install --upgrade pip`

## Common Issues and Solutions

- **"Command not found" after installing a package**: You may need to restart your terminal or reinstall the package with the `--user` flag
- **Conflicts between packages**: Create separate environments for conflicting packages
- **Changes not taking effect in Jupyter**: Restart the kernel after installing new packages