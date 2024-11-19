---
layout: post
title: "Markdown Cheatsheet"
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