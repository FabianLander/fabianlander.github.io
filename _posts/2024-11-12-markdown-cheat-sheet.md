---
layout: post
title: "Markdown and Key Binding Cheatsheet"
date: 2024-11-12
categories: [tutorials, markdown]
tags: [markdown, writing, documentation]
permalink: "/mardown-cheat-sheet.html"
excerpt: "A no-frills guide to writing in Markdown. Covers everything from basic formatting to tables and Jekyll-specific features, with practical examples you can copy and use right away."
---

# Markdown Tutorial

## Basic Text Formatting
```markdown
Plain text requires no special formatting.
**Bold text** uses double asterisks
*Italic text* uses single asterisks
***Bold and italic*** uses triple asterisks
~~Strikethrough~~ uses double tildes
```
Plain text requires no special formatting.
**Bold text** uses double asterisks
*Italic text* uses single asterisks
***Bold and italic*** uses triple asterisks
~~Strikethrough~~ uses double tildes

```markdown
# H1 Header
## H2 Header
### H3 Header
#### H4 Header
##### H5 Header
###### H6 Header
```

## Headers
# H1 Header
## H2 Header
### H3 Header
#### H4 Header
##### H5 Header
###### H6 Header


## Lists
* Item 1
* Item 2
  * Nested item 2.1
  * Nested item 2.2
* Item 3

1. First item
2. Second item
   1. Nested item 2.1
   2. Nested item 2.2
3. Third item

```markdown
* Item 1
* Item 2
  * Nested item 2.1
  * Nested item 2.2
* Item 3

1. First item
2. Second item
   1. Nested item 2.1
   2. Nested item 2.2
3. Third item
```

## Links and Images
[Link text](https://example.com)
[Link with title](https://example.com "Link title")
![Alt text for image](https://example.com/image.jpg)

```markdown
[Link text](https://example.com)
[Link with title](https://example.com "Link title")
![Alt text for image](https://example.com/image.jpg)
```

## Code
Inline `code` uses backticks

```python
# Code block with syntax highlighting
def hello_world():
    print("Hello, World!")
```

````markdown
Inline `code` uses backticks

```python
# Code block with syntax highlighting
def hello_world():
    print("Hello, World!")
```
````

## Blockquotes
> Single line blockquote
>
> Multiline blockquote
> continues here
>> Nested blockquote

```markdown
> Single line blockquote
>
> Multiline blockquote
> continues here
>> Nested blockquote
```

## Tables
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |

```markdown
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
```

## Task Lists
- [x] Completed task
- [ ] Uncompleted task

```markdown
- [x] Completed task
- [ ] Uncompleted task
```

## Horizontal Rules
Three or more hyphens, asterisks, or underscores:

---
***
___


```markdown
---
***
___
```

## Front Matter
```yaml
---
layout: post
title: "Markdown Tutorial"
date: 2024-11-19
categories: [tutorials, markdown]
tags: [markdown, writing]
---
```

## VSCode Vim Keybindings

Below are custom keybindings defined in `keybindings.json`, organized by category for clarity. These enhance productivity when using the Vim plugin in VSCode.

### Navigation
- `Ctrl + h/j/k/l` — Move focus to the left/down/up/right editor group
- `s h` — Split editor horizontally
- `s v` — Split editor vertically
- `space ,` — Show tab picker for all open editors
- `space e` — Toggle sidebar (and focus file explorer if hidden)
- `tab` / `shift + tab` — Cycle through tabs in the current group

### File/Buffer Management
- `space space` — Quick file picker (fuzzy search)
- `space b d` — Close current editor (buffer)
- `space b o` — Close all other editors

### Coding and Refactoring
- `space c a` — Code actions (e.g. quick fixes, refactors)
- `space c r` — Rename symbol under cursor
- `space c s` — Go to symbol in current file
- `shift + k/j` (VisualLine mode) — Move selected lines up/down
- `shift + k` (Normal mode) — Show hover information
- `ctrl + n` — Multi-cursor: select next occurrence

### Search and Navigation
- `space g d` — Go to definition
- `space g r` — Find references
- `space g i` — Go to implementation
- `space s g` — Global search (find in files)

### Git Integration
- `space g g` — Open and focus Git panel

### Copilot (AI Suggestions)
- `ctrl + y` — Accept full inline suggestion
- `cmd + →` — Accept next word
- `cmd + shift + →` — Accept next line
- `alt + ] / alt + [` — Show next/previous suggestion
- `escape` — Dismiss suggestion

### File Explorer (Focus on Sidebar)
- `a` — Create new file
- `r` — Rename file/folder
- `c` / `x` / `p` — Copy / Cut / Paste file or folder
- `d` — Delete file/folder
- `s` — Open file in split pane
- `shift + s` — Open in vertical split below and close others
- `enter` — Open file or toggle folder (depending on selection)

### Debugging
- `space d a` — Select and start debug config
- `space d t` — Stop debugging
- `space d o` — Step over
- `space d c` — Continue execution
- `space d b` — Toggle breakpoint
- `space d e` — Show debug hover

### Miscellaneous
- `space c c` — Toggle VS Code chat (AI chat interface)

All shortcuts are active in Normal mode unless stated otherwise.
```