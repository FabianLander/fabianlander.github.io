---
layout: post
title: "Creating an SVG Illustration of the Modular Surface"
date: 2024-11-26
categories: [graphics, mathematics, web-development]
excerpt: Recently, I needed a way to illustrate the modular surfaces $\PSL(2,\mathbb{R})/\PSL(2,\mathbb{Z})$. We will use Python to generate vector graphics files. Here's how I created a simple illustration.
---

Recently, I needed a clean way to visualize the modular surface $\PSL(2,\mathbb{R})/\PSL(2,\mathbb{Z})$. The task was to use SVG, i.e. Scalable Vector Graphics, which turned out to be a rather elegant solution! Here's how I created a simple illustration. First, let's figure out how the SVG format works.


```Note
NOTE: I will use python throughout and I will provide code in such a way that the result can be viewed in a jupyter notebook. 
```

## What is SVG?

SVG is, at its core, just XML (eXtensible Markup Language) text that follows a specific format for describing vector graphics. When you create an SVG file, you're essentially writing a set of instructions that tell a renderer (like a web browser) how to draw shapes, lines, and curves.

Let's break down the key components:

### 1. The SVG Container

Every SVG starts with an opening tag that defines the drawing space:

```xml
<svg viewBox="-0.5 -0.5 3 3" xmlns="http://www.w3.org/2000/svg">
  <!-- Content goes here -->
</svg>
```

The `viewBox` attribute is crucial - it defines our coordinate system:
- First two numbers (-0.5, -0.5): The starting point (top-left corner)
- Last two numbers (3, 3): The width and height
- This gives us a coordinate system that spans from -0.5 to 2.5 on both axes

<!-- The `xmlns="http://www.w3.org/2000/svg"` is an XML namespace declaration that's required for standalone SVG files. Here's why it matters:

- XML allows different markup languages to be mixed (HTML, SVG, MathML)
- The namespace tells the parser "these tags should be interpreted as SVG elements"
- While modern HTML5 can assume SVG elements automatically, standalone SVG files must include this declaration
- The URL `http://www.w3.org/2000/svg` is the official identifier for SVG (it doesn't need to be an actual webpage)
- The "2000" in the URL refers to the year SVG was standardized by W3C -->


### 2. Basic Shapes

SVG provides several basic shapes as XML elements:

```xml
<!-- Line -->
<line x1="0" y1="0" x2="1" y2="1" stroke="black"/>

<!-- Circle -->
<circle cx="1" cy="1" r="1" fill="none" stroke="black"/>

<!-- Rectangle -->
<rect x="0" y="0" width="1" height="1" fill="blue"/>
```

### 3. Paths

The most powerful element for us is the `<path>`. It uses a series of commands to draw more complex shapes. We will need:
- `M x y`: Move to position (x,y)
- `L x y`: Draw line to position (x,y)
- `A rx ry x-axis-rotation large-arc-flag sweep-flag x y`: Draw an arc

## A simple but relevant example

Let's put this knowledge to work by creating a visualization of geodesics in the upper half plane. Here's the complete code:

```python
from IPython.display import SVG, display
import math

def create_half_circle():
    """Create upper half of unit circle centered at origin"""
    return f'<path d="M -1 0 A 1 1 0 0 1 1 0" ' \
           'stroke="red" fill="none" stroke-width="0.02"/>'

# Calculate starting points for vertical lines
x1, x2 = -0.5, 0.5
y_start = math.sqrt(3)/2

# Calculate our mathematical bounds
x_min, x_max = -2.0, 2.0
y_min, y_max = -2.0, 2.0
width = x_max - x_min
height = y_max - y_min

# Create the complete SVG
svg_content = f"""<svg viewBox="{x_min} {-y_max} {width} {height}" 
                     xmlns="http://www.w3.org/2000/svg">
    <!-- Upper half of unit circle -->
    {create_half_circle()}
</svg>"""

# Display in Jupyter notebook
display(SVG(svg_content))

# Save to file
with open('fundamental_domain_mathematical.svg', 'w') as f:
    f.write(svg_content)
```

Let's break down what this code does:

1. **Vertical Line Function**: Creates a `<line>` element with specified x-coordinate
   - Uses explicit start and end points
   - Represents geodesics in the upper half plane model

2. **Arc Function**: Creates a `<path>` element for half circles
   - `M x y`: Moves to starting point
   - `A rx ry x-axis-rotation large-arc-flag sweep-flag x y`: Draws the half circle
   - The flags control how the arc is drawn:
     - `large-arc-flag=0`: Use smaller arc (≤180°)
     - `sweep-flag=1`: Draw clockwise

3. **SVG Assembly**: Combines elements with proper viewBox and namespace

## Why This Approach Works Well

1. **Mathematical Precision**: SVG paths and elements represent exact mathematical shapes, not approximations
2. **Scalability**: The image remains crisp at any size
3. **Small File Size**: The instructions are concise - no need to store thousands of points
4. **Easy Modification**: We can easily adjust parameters or add new elements
5. **Web-Ready**: SVGs can be directly embedded in web pages or included in documents

## Next Steps

This basic setup can be extended to create more complex visualizations:
- Add more geodesics to show the fundamental domain
- Implement modular transformations
- Add interactive elements using JavaScript
- Include labels and mathematical notation

The combination of Python's string manipulation capabilities with SVG's precise vector graphics makes it an excellent choice for mathematical visualization. The resulting files are lightweight, scalable, and perfect for both web and print use.

## Fundamental domain of $\PSL(2,\ZZ)$ 

Lets first discuss the objects needed to indicate our fundamental domain. We need
- A horizontal line indicating the $x$-axis.
- A circle of radius 1 centered at the origin.
- Two vertical lines starting on the circle at $x=\pm \frac{1}{2}$ emmitting upwards.

The two lines start at $(\pm \frac{1}{2}, \frac{\sqrt{3}}{2})$.

For visualization purposes we will also draw a faint grid in the background. (You can ignore the create_grid function if you don't care about this.)
Lets create the svg


```python
from IPython.display import SVG, display
import math

def create_grid(x_min=-1, x_max=2, y_min=0, y_max=2, step=1.0):
    """Create a light grid system"""
    lines = []
    # Vertical grid lines
    for x in [i * step for i in range(int(x_min/step), int(x_max/step) + 1)]:
        lines.append(f'<line x1="{x:.1f}" y1="{y_min}" x2="{x:.1f}" y2="{y_max}" '
                    'stroke="#eee" stroke-width="0.01"/>')
    # Horizontal grid lines
    for y in [i * step for i in range(int(y_min/step), int(y_max/step) + 1)]:
        lines.append(f'<line x1="{x_min}" y1="{y:.1f}" x2="{x_max}" y2="{y:.1f}" '
                    'stroke="#eee" stroke-width="0.01"/>')
    return '\n'.join(lines)

def create_vertical_line(x, y_start, y_max=2):
    """Create a vertical line using SVG line command"""
    return f'<line x1="{x}" y1="{y_start}" x2="{x}" y2="{y_max}" ' \
           'stroke="blue" stroke-width="0.02"/>'

def create_circle(center_x, center_y, radius):
    """Create a circle using SVG circle command"""
    return f'<circle cx="{center_x}" cy="{center_y}" r="{radius}" ' \
           'stroke="red" fill="none" stroke-width="0.02"/>'

# Calculate our mathematical bounds
x_min, x_max = -2.0, 2.0  #  x range
y_min, y_max = -2.0, 2.0  #  y range
width = x_max - x_min
height = y_max - y_min

# Create the complete SVG with mathematical viewBox
# Create the complete SVG with mathematical viewBox
svg_content = f"""<svg viewBox="{x_min} {-y_max} {width} {height}"xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <style>
                    text { font-family: Arial, sans-serif; }
                    </style>
                </defs>
                <g transform="scale(1,-1)">
                    <!-- Background grid -->
                    {create_grid(x_min=x_min, x_max=x_max, y_min=y_min, y_max=y_max)}
                    <!-- Unit circle centered at origin -->
                    {create_circle(0, 0, 1)}
                    <!-- Vertical lines at x = ±1/2 starting from the circle -->
                    {create_vertical_line(x1, y_start)}
                    {create_vertical_line(x2, y_start)}
                </g>
                </svg>"""

# Display in Jupyter notebook
display(SVG(svg_content))

# Save to file
with open('modular_surface.svg', 'w') as f:
    f.write(svg_content)
```

<img src="/assets/images/modular_surface.svg" width="400" height="400" style="display: block; margin: 0 auto;" alt="Picture of the generated SVG">

Now we need to 
