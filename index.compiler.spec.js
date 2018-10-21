import { compiler } from './index';
import React from 'react';
import ReactDOM from 'react-dom';
import fs from 'fs';

const root = document.body.appendChild(document.createElement('div'));

function render(jsx) {
  return ReactDOM.render(jsx, root);
}

afterEach(() => ReactDOM.unmountComponentAtNode(root));

it('should throw if not passed a string (first arg)', () => {
  expect(() => compiler('')).not.toThrow();

  expect(() => compiler()).toThrow();
  expect(() => compiler(1)).toThrow();
  expect(() => compiler(() => {})).toThrow();
  expect(() => compiler({})).toThrow();
  expect(() => compiler([])).toThrow();
  expect(() => compiler(null)).toThrow();
  expect(() => compiler(true)).toThrow();
});

it('should handle a basic string', () => {
  render(compiler('Hello.'));

  expect(root.textContent).toBe('Hello.');
});

it('wraps multiple block element returns in a div to avoid invalid nesting errors', () => {
  render(compiler('# Boop\n\n## Blep'));

  expect(root.innerHTML).toMatchInlineSnapshot(`

<div data-reactroot>
  <h1 id="boop">
    Boop
  </h1>
  <h2 id="blep">
    Blep
  </h2>
</div>

`);
});

it('wraps solely inline elements in a span, rather than a div', () => {
  render(compiler("Hello. _Beautiful_ day isn't it?"));

  expect(root.innerHTML).toMatchInlineSnapshot(`

<span data-reactroot>
  Hello.
  <em>
    Beautiful
  </em>
  day isn't it?
</span>

`);
});

it('#190 perf regression', () => {
  render(
    compiler(
      'Lorum *ipsum*: <a href="" style="float: right"><small>foo</small></a><span style="float: right"><small>&nbsp;</small></span><a href="" style="float: right"><small>bar</small></a>'
    )
  );

  expect(root.innerHTML).toMatchInlineSnapshot(`

<span data-reactroot>
  Lorum
  <em>
    ipsum
  </em>
  :
  <a href
     style="float: right;"
  >
    <small>
      foo
    </small>
  </a>
  <span style="float: right;">
    <small>
      &nbsp;
    </small>
  </span>
  <a href
     style="float: right;"
  >
    <small>
      bar
    </small>
  </a>
</span>

`);
});

describe('inline textual elements', () => {
  it('should handle emphasized text', () => {
    render(compiler('*Hello.*'));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<em data-reactroot>
  Hello.
</em>

`);
  });

  it('should handle double-emphasized text', () => {
    render(compiler('**Hello.**'));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<strong data-reactroot>
  Hello.
</strong>

`);
  });

  it('should handle triple-emphasized text', () => {
    render(compiler('***Hello.***'));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<strong data-reactroot>
  <em>
    Hello.
  </em>
</strong>

`);
  });

  it('should handle triple-emphasized text with mixed syntax 1/2', () => {
    render(compiler('**_Hello._**'));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<strong data-reactroot>
  <em>
    Hello.
  </em>
</strong>

`);
  });

  it('should handle triple-emphasized text with mixed syntax 2/2', () => {
    render(compiler('_**Hello.**_'));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<em data-reactroot>
  <strong>
    Hello.
  </strong>
</em>

`);
  });

  it('should handle the alternate form of bold/italic', () => {
    render(compiler('___Hello.___'));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<strong data-reactroot>
  <em>
    Hello.
  </em>
</strong>

`);
  });

  it('should handle deleted text', () => {
    render(compiler('~~Hello.~~'));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<del data-reactroot>
  Hello.
</del>

`);
  });

  it('should handle deleted text containing other syntax with a tilde', () => {
    render(compiler('~~Foo `~~bar` baz.~~'));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<del data-reactroot>
  Foo
  <code>
    ~~bar
  </code>
  baz.
</del>

`);
  });

  it('should handle block deleted text containing other syntax with a tilde', () => {
    render(compiler('~~Foo `~~bar` baz.~~\n\nFoo ~~bar~~.'));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<div data-reactroot>
  <p>
    <del>
      Foo
      <code>
        ~~bar
      </code>
      baz.
    </del>
  </p>
  <p>
    Foo
    <del>
      bar
    </del>
    .
  </p>
</div>

`);
  });

  it('should handle escaped text', () => {
    render(compiler('Hello.\\_\\_foo\\_\\_'));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<span data-reactroot>
  Hello.__foo__
</span>

`);
  });

  it('regression test for #188, mismatched syntaxes triggered the wrong result', () => {
    render(compiler('*This should render as normal text, not emphasized._'));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<span data-reactroot>
  *This should render as normal text, not emphasized._
</span>

`);
  });

  it('ignore similar syntax inside inline syntax', () => {
    render(
      compiler(
        '*This should not misinterpret the asterisk <span>*</span> in the HTML.*'
      )
    );

    expect(root.innerHTML).toMatchInlineSnapshot(`

<em data-reactroot>
  This should not misinterpret the asterisk
  <span>
    *
  </span>
  in the HTML.
</em>

`);

    render(
      compiler(
        '*This should not misinterpret the asterisk [*](x) in the anchor text.*'
      )
    );

    expect(root.innerHTML).toMatchInlineSnapshot(`

<em data-reactroot>
  This should not misinterpret the asterisk
  <a href="x">
    *
  </a>
  in the anchor text.
</em>

`);

    render(
      compiler(
        '*This should not misinterpret the asterisk [foo](x*) in the link href.*'
      )
    );

    expect(root.innerHTML).toMatchInlineSnapshot(`

<em data-reactroot>
  This should not misinterpret the asterisk
  <a href="x*">
    foo
  </a>
  in the link href.
</em>

`);

    render(
      compiler(
        '*This should not misinterpret the asterisk ~~*~~ in the strikethrough.*'
      )
    );

    expect(root.innerHTML).toMatchInlineSnapshot(`

<em data-reactroot>
  This should not misinterpret the asterisk
  <del>
    *
  </del>
  in the strikethrough.
</em>

`);

    render(
      compiler(
        '*This should not misinterpret the asterisk `*` in the backticks.*'
      )
    );

    expect(root.innerHTML).toMatchInlineSnapshot(`

<em data-reactroot>
  This should not misinterpret the asterisk
  <code>
    *
  </code>
  in the backticks.
</em>

`);
  });

  it('replaces common HTML character codes with unicode equivalents so React will render correctly', () => {
    render(compiler('Foo &nbsp; bar&amp;baz.'));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<span data-reactroot>
  Foo &nbsp; bar&amp;baz.
</span>

`);
  });
});

describe('misc block level elements', () => {
  it('should handle blockquotes', () => {
    render(compiler('> Something important, perhaps?'));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<blockquote data-reactroot>
  <p>
    Something important, perhaps?
  </p>
</blockquote>

`);
  });
});

describe('headings', () => {
  it('should handle level 1 properly', () => {
    render(compiler('# Hello World'));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<h1 data-reactroot
    id="hello-world"
>
  Hello World
</h1>

`);
  });

  it('should handle level 2 properly', () => {
    render(compiler('## Hello World'));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<h2 data-reactroot
    id="hello-world"
>
  Hello World
</h2>

`);
  });

  it('should handle level 3 properly', () => {
    render(compiler('### Hello World'));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<h3 data-reactroot
    id="hello-world"
>
  Hello World
</h3>

`);
  });

  it('should handle level 4 properly', () => {
    render(compiler('#### Hello World'));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<h4 data-reactroot
    id="hello-world"
>
  Hello World
</h4>

`);
  });

  it('should handle level 5 properly', () => {
    render(compiler('##### Hello World'));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<h5 data-reactroot
    id="hello-world"
>
  Hello World
</h5>

`);
  });

  it('should handle level 6 properly', () => {
    render(compiler('###### Hello World'));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<h6 data-reactroot
    id="hello-world"
>
  Hello World
</h6>

`);
  });

  it('should handle setext level 1 style', () => {
    render(compiler('Hello World\n===========\n\nsomething'));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<div data-reactroot>
  <h1>
    Hello World
  </h1>
  <p>
    something
  </p>
</div>

`);
  });

  it('should handle setext level 2 style', () => {
    render(compiler('Hello World\n-----------\n\nsomething'));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<div data-reactroot>
  <h2>
    Hello World
  </h2>
  <p>
    something
  </p>
</div>

`);
  });

  it('should handle consecutive headings without a padding newline', () => {
    render(compiler('# Hello World\n## And again'));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<div data-reactroot>
  <h1 id="hello-world">
    Hello World
  </h1>
  <h2 id="and-again">
    And again
  </h2>
</div>

`);
  });

  it('adds an "id" attribute to headings for deeplinking purposes', () => {
    render(compiler("# This is~ a very' complicated> header!"));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<h1 data-reactroot
    id="this-is-a-very-complicated-header"
>
  This is~ a very' complicated&gt; header!
</h1>

`);
  });
});

describe('images', () => {
  it('should handle a basic image', () => {
    render(compiler('![](/xyz.png)'));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<img data-reactroot
     src="/xyz.png"
>

`);
  });

  it('should handle an image with alt text', () => {
    render(compiler('![test](/xyz.png)'));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<img data-reactroot
     alt="test"
     src="/xyz.png"
>

`);
  });

  it('should handle an image with title', () => {
    render(compiler('![test](/xyz.png "foo")'));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<img data-reactroot
     alt="test"
     title="foo"
     src="/xyz.png"
>

`);
  });

  it('should handle an image reference', () => {
    render(compiler(['![][1]', '[1]: /xyz.png'].join('\n')));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<p data-reactroot>
  <img src="/xyz.png">
</p>

`);
  });

  it('should handle an image reference with alt text', () => {
    render(compiler(['![test][1]', '[1]: /xyz.png'].join('\n')));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<p data-reactroot>
  <img alt="test"
       src="/xyz.png"
  >
</p>

`);
  });

  it('should handle an image reference with title', () => {
    render(compiler(['![test][1]', '[1]: /xyz.png "foo"'].join('\n')));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<p data-reactroot>
  <img alt="test"
       src="/xyz.png"
       title="foo"
  >
</p>

`);
  });
});

describe('links', () => {
  it('should handle a basic link', () => {
    render(compiler('[foo](/xyz.png)'));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<a data-reactroot
   href="/xyz.png"
>
  foo
</a>

`);
  });

  it('should handle a link with title', () => {
    render(compiler('[foo](/xyz.png "bar")'));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<a data-reactroot
   href="/xyz.png"
   title="bar"
>
  foo
</a>

`);
  });

  it('should handle a link reference', () => {
    render(compiler(['[foo][1]', '[1]: /xyz.png'].join('\n')));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<p data-reactroot>
  <a href="/xyz.png">
    foo
  </a>
</p>

`);
  });

  it('should handle a link reference with a space', () => {
    render(compiler(['[foo] [1]', '[1]: /xyz.png'].join('\n')));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<p data-reactroot>
  <a href="/xyz.png">
    foo
  </a>
</p>

`);
  });

  it('should handle a link reference with title', () => {
    render(compiler(['[foo][1]', '[1]: /xyz.png "bar"'].join('\n')));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<p data-reactroot>
  <a href="/xyz.png"
     title="bar"
  >
    foo
  </a>
</p>

`);
  });

  it('should handle autolink style', () => {
    render(compiler('<https://google.com>'));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<a data-reactroot
   href="https://google.com"
>
  https://google.com
</a>

`);
  });

  it('should handle autolinks after a paragraph (regression)', () => {
    render(
      compiler(`
**autolink** style

<https://google.com>
                `)
    );

    expect(root.innerHTML).toMatchInlineSnapshot(`

<div data-reactroot>
  <p>
    <strong>
      autolink
    </strong>
    style
  </p>
  <p>
    <a href="https://google.com">
      https://google.com
    </a>
  </p>
</div>

`);
  });

  it('should handle mailto autolinks after a paragraph', () => {
    render(
      compiler(`
**autolink** style

<mailto:probablyup@gmail.com>
                `)
    );

    expect(root.innerHTML).toMatchInlineSnapshot(`

<div data-reactroot>
  <p>
    <strong>
      autolink
    </strong>
    style
  </p>
  <p>
    <a href="mailto:probablyup@gmail.com">
      probablyup@gmail.com
    </a>
  </p>
</div>

`);
  });

  it('should handle a mailto autolink', () => {
    render(compiler('<mailto:probablyup@gmail.com>'));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<a data-reactroot
   href="mailto:probablyup@gmail.com"
>
  probablyup@gmail.com
</a>

`);
  });

  it('should an email autolink and add a mailto: prefix', () => {
    render(compiler('<probablyup@gmail.com>'));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<a data-reactroot
   href="mailto:probablyup@gmail.com"
>
  probablyup@gmail.com
</a>

`);
  });

  it('should automatically link found URLs', () => {
    render(compiler('https://google.com'));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<a data-reactroot
   href="https://google.com"
>
  https://google.com
</a>

`);
  });

  it('should sanitize links containing JS expressions', () => {
    render(compiler('[foo](javascript:doSomethingBad)'));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<a data-reactroot>
  foo
</a>

`);
  });

  it('should sanitize links containing invalid characters', () => {
    render(compiler('[foo](https://google.com/%AF)'));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<a data-reactroot>
  foo
</a>

`);
  });

  it('should handle a link with a URL in the text', () => {
    render(
      compiler('[https://www.google.com *heck yeah*](http://www.google.com)')
    );

    expect(root.innerHTML).toMatchInlineSnapshot(`

<a data-reactroot
   href="http://www.google.com"
>
  https://www.google.com
  <em>
    heck yeah
  </em>
</a>

`);
  });

  it('regression test for #188, link inside underscore emphasis with underscore', () => {
    render(
      compiler(
        '_This is emphasized text with [a link](https://example.com/asdf_asdf.pdf), and another [link](https://example.com)._'
      )
    );

    expect(root.innerHTML).toMatchInlineSnapshot(`

<em data-reactroot>
  This is emphasized text with
  <a href="https://example.com/asdf_asdf.pdf">
    a link
  </a>
  , and another
  <a href="https://example.com">
    link
  </a>
  .
</em>

`);
  });

  it('regression test for #188, link inside underscore bolding with underscore', () => {
    render(
      compiler(
        '__This is emphasized text with [a link](https://example.com/asdf__asdf.pdf), and another [link](https://example.com).__'
      )
    );

    expect(root.innerHTML).toMatchInlineSnapshot(`

<strong data-reactroot>
  This is emphasized text with
  <a href="https://example.com/asdf__asdf.pdf">
    a link
  </a>
  , and another
  <a href="https://example.com">
    link
  </a>
  .
</strong>

`);
  });
});

describe('lists', () => {
  it('should handle a tight list', () => {
    render(compiler(['- xyz', '- abc', '- foo'].join('\n')));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<ul data-reactroot>
  <li>
    xyz
  </li>
  <li>
    abc
  </li>
  <li>
    foo
  </li>
</ul>

`);
  });

  it('should handle a loose list', () => {
    render(compiler(['- xyz', '', '- abc', '', '- foo'].join('\n')));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<ul data-reactroot>
  <li>
    <p>
      xyz
    </p>
  </li>
  <li>
    <p>
      abc
    </p>
  </li>
  <li>
    <p>
      foo
    </p>
  </li>
</ul>

`);
  });

  it('should handle an ordered list', () => {
    render(compiler(['1. xyz', '1. abc', '1. foo'].join('\n')));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<ol data-reactroot
    start="1"
>
  <li>
    xyz
  </li>
  <li>
    abc
  </li>
  <li>
    foo
  </li>
</ol>

`);
  });

  it('should handle an ordered list with a specific start index', () => {
    render(compiler(['2. xyz', '3. abc', '4. foo'].join('\n')));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<ol data-reactroot
    start="2"
>
  <li>
    xyz
  </li>
  <li>
    abc
  </li>
  <li>
    foo
  </li>
</ol>

`);
  });

  it('should handle a nested list', () => {
    render(compiler(['- xyz', '  - abc', '- foo'].join('\n')));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<ul data-reactroot>
  <li>
    xyz
    <ul>
      <li>
        abc
      </li>
    </ul>
  </li>
  <li>
    foo
  </li>
</ul>

`);
  });

  it('should handle a mixed nested list', () => {
    render(compiler(['- xyz', '  1. abc', '    - def', '- foo'].join('\n')));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<ul data-reactroot>
  <li>
    xyz
    <ol start="1">
      <li>
        abc
        <ul>
          <li>
            def
          </li>
        </ul>
      </li>
    </ol>
  </li>
  <li>
    foo
  </li>
</ul>

`);
  });

  it('should not add an extra wrapper around a list', () => {
    render(
      compiler(['', '- xyz', '  1. abc', '    - def', '- foo', ''].join('\n'))
    );

    expect(root.innerHTML).toMatchInlineSnapshot(`

<ul data-reactroot>
  <li>
    xyz
    <ol start="1">
      <li>
        abc
        <ul>
          <li>
            def
          </li>
        </ul>
      </li>
    </ol>
  </li>
  <li>
    foo
  </li>
</ul>

`);
  });

  it('should handle link trees', () => {
    render(
      compiler(`
- [buttermilk](#buttermilk)
- [installation](#installation)
- [usage](#usage)
    - [configuration](#configuration)
    - [components](#components)
        - [\`<Router>\`](#router)
        - [\`<RoutingState>\`](#routingstate)
        - [\`<Link>\`](#link)
    - [utilities](#utilities)
        - [\`route(url: String, addNewHistoryEntry: Boolean = true)\`](#routeurl-string-addnewhistoryentry-boolean--true)
    - [holistic example](#holistic-example)
- [goals](#goals)
            `)
    );

    expect(root.innerHTML).toMatchInlineSnapshot(`

<ul data-reactroot>
  <li>
    <a href="#buttermilk">
      buttermilk
    </a>
  </li>
  <li>
    <a href="#installation">
      installation
    </a>
  </li>
  <li>
    <a href="#usage">
      usage
    </a>
    <ul>
      <li>
        <a href="#configuration">
          configuration
        </a>
      </li>
      <li>
        <a href="#components">
          components
        </a>
        <ul>
          <li>
            <a href="#router">
              <code>
                &lt;Router&gt;
              </code>
            </a>
          </li>
          <li>
            <a href="#routingstate">
              <code>
                &lt;RoutingState&gt;
              </code>
            </a>
          </li>
          <li>
            <a href="#link">
              <code>
                &lt;Link&gt;
              </code>
            </a>
          </li>
        </ul>
      </li>
      <li>
        <a href="#utilities">
          utilities
        </a>
        <ul>
          <li>
            <a href="#routeurl-string-addnewhistoryentry-boolean--true">
              <code>
                route(url: String, addNewHistoryEntry: Boolean = true)
              </code>
            </a>
          </li>
        </ul>
      </li>
      <li>
        <a href="#holistic-example">
          holistic example
        </a>
      </li>
    </ul>
  </li>
  <li>
    <a href="#goals">
      goals
    </a>
  </li>
</ul>

`);
  });

  it('handles horizontal rules after lists', () => {
    render(
      compiler(`
-   one
-   two

* * *
      `)
    );

    expect(root.innerHTML).toMatchInlineSnapshot(`

<div data-reactroot>
  <ul>
    <li>
      one
    </li>
    <li>
      two
    </li>
  </ul>
  <hr>
</div>

`);
  });
});

describe('GFM task lists', () => {
  it('should handle unchecked items', () => {
    render(compiler('- [ ] foo'));

    const checkbox = root.querySelector('ul li input');

    expect(root.innerHTML).toMatchInlineSnapshot(`

<ul data-reactroot>
  <li>
    <input type="checkbox"
           readonly
           value="on"
    >
    foo
  </li>
</ul>

`);
    expect(checkbox.checked).toBe(false);
  });

  it('should handle checked items', () => {
    render(compiler('- [x] foo'));

    const checkbox = root.querySelector('ul li input');

    expect(root.innerHTML).toMatchInlineSnapshot(`

<ul data-reactroot>
  <li>
    <input type="checkbox"
           readonly
           value="on"
    >
    foo
  </li>
</ul>

`);
    expect(checkbox.checked).toBe(true);
  });

  it('should mark the checkboxes as readonly', () => {
    render(compiler('- [x] foo'));

    const checkbox = root.querySelector('ul li input');

    expect(checkbox).not.toBe(null);
    expect(checkbox.readOnly).toBe(true);
  });
});

describe('GFM tables', () => {
  it('should handle a basic table', () => {
    render(compiler(['foo|bar', '---|---', '1  |2'].join('\n')));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<table data-reactroot>
  <thead>
    <tr>
      <th scope="col">
        foo
      </th>
      <th scope="col">
        bar
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        1
      </td>
      <td>
        2
      </td>
    </tr>
  </tbody>
</table>

`);
  });

  it('should handle a table with aligned columns', () => {
    render(compiler(['foo|bar|baz', '--:|:---:|:--', '1|2|3'].join('\n')));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<table data-reactroot>
  <thead>
    <tr>
      <th scope="col"
          style="text-align: right;"
      >
        foo
      </th>
      <th scope="col"
          style="text-align: center;"
      >
        bar
      </th>
      <th scope="col"
          style="text-align: left;"
      >
        baz
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: right;">
        1
      </td>
      <td style="text-align: center;">
        2
      </td>
      <td style="text-align: left;">
        3
      </td>
    </tr>
  </tbody>
</table>

`);
  });

  it('should handle the other syntax for tables', () => {
    render(
      compiler(
        [
          '| Foo | Bar |',
          '| --- | --- |',
          '| 1   | 2   |',
          '| 3   | 4   |',
        ].join('\n')
      )
    );

    expect(root.innerHTML).toMatchInlineSnapshot(`

<table data-reactroot>
  <thead>
    <tr>
      <th scope="col">
        Foo
      </th>
      <th scope="col">
        Bar
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        1
      </td>
      <td>
        2
      </td>
    </tr>
    <tr>
      <td>
        3
      </td>
      <td>
        4
      </td>
    </tr>
  </tbody>
</table>

`);
  });

  it('should handle the other syntax for tables with alignment', () => {
    render(
      compiler(
        [
          '| Foo | Bar | Baz |',
          '| --: | :-: | :-- |',
          '| 1   | 2   | 3   |',
          '| 4   | 5   | 6   |',
        ].join('\n')
      )
    );

    expect(root.innerHTML).toMatchInlineSnapshot(`

<table data-reactroot>
  <thead>
    <tr>
      <th scope="col"
          style="text-align: right;"
      >
        Foo
      </th>
      <th scope="col"
          style="text-align: center;"
      >
        Bar
      </th>
      <th scope="col"
          style="text-align: left;"
      >
        Baz
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: right;">
        1
      </td>
      <td style="text-align: center;">
        2
      </td>
      <td style="text-align: left;">
        3
      </td>
    </tr>
    <tr>
      <td style="text-align: right;">
        4
      </td>
      <td style="text-align: center;">
        5
      </td>
      <td style="text-align: left;">
        6
      </td>
    </tr>
  </tbody>
</table>

`);
  });

  it('should handle other content after a table', () => {
    render(
      compiler(
        [
          '| Foo | Bar | Baz |',
          '| --: | :-: | :-- |',
          '| 1   | 2   | 3   |',
          '| 4   | 5   | 6   |',
          '',
          'Foo',
        ].join('\n')
      )
    );

    expect(root.innerHTML).toMatchInlineSnapshot(`

<div data-reactroot>
  <table>
    <thead>
      <tr>
        <th scope="col"
            style="text-align: right;"
        >
          Foo
        </th>
        <th scope="col"
            style="text-align: center;"
        >
          Bar
        </th>
        <th scope="col"
            style="text-align: left;"
        >
          Baz
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="text-align: right;">
          1
        </td>
        <td style="text-align: center;">
          2
        </td>
        <td style="text-align: left;">
          3
        </td>
      </tr>
      <tr>
        <td style="text-align: right;">
          4
        </td>
        <td style="text-align: center;">
          5
        </td>
        <td style="text-align: left;">
          6
        </td>
      </tr>
    </tbody>
  </table>
  <p>
    Foo
  </p>
</div>

`);
  });
});

describe('arbitrary HTML', () => {
  it('preserves the HTML given', () => {
    render(compiler('<dd>Hello</dd>'));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<dd data-reactroot>
  Hello
</dd>

`);
  });

  it('processes markdown within inline HTML', () => {
    render(compiler('<time>**Hello**</time>'));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<time data-reactroot>
  <strong>
    Hello
  </strong>
</time>

`);
  });

  it('processes markdown within nested inline HTML', () => {
    render(compiler('<time><span>**Hello**</span></time>'));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<time data-reactroot>
  <span>
    <strong>
      Hello
    </strong>
  </span>
</time>

`);
  });

  it('processes markdown within nested inline HTML where childen appear more than once', () => {
    render(
      compiler('<dl><dt>foo</dt><dd>bar</dd><dt>baz</dt><dd>qux</dd></dl>')
    );

    expect(root.innerHTML).toMatchInlineSnapshot(`

<dl data-reactroot>
  <dt>
    foo
  </dt>
  <dd>
    bar
  </dd>
  <dt>
    baz
  </dt>
  <dd>
    qux
  </dd>
</dl>

`);
  });

  it('processes attributes within inline HTML', () => {
    render(compiler('<time data-foo="bar">Hello</time>'));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<time data-reactroot
      data-foo="bar"
>
  Hello
</time>

`);
  });

  it('processes attributes that need JSX massaging within inline HTML', () => {
    render(compiler('<span tabindex="0">Hello</span>'));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<span data-reactroot
      tabindex="0"
>
  Hello
</span>

`);
  });

  it('processes inline HTML with inline styles', () => {
    render(
      compiler(
        '<span style="color: red; position: top; margin-right: 10px">Hello</span>'
      )
    );

    expect(root.innerHTML).toMatchInlineSnapshot(`

<span data-reactroot
      style="color: red; position: top; margin-right: 10px;"
>
  Hello
</span>

`);
  });

  it('processes markdown within block-level arbitrary HTML', () => {
    render(compiler('<p>**Hello**</p>'));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<p data-reactroot>
  <strong>
    Hello
  </strong>
</p>

`);
  });

  it('processes markdown within block-level arbitrary HTML (regression)', () => {
    render(compiler('<div style="float: right">\n# Hello\n</div>'));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<div data-reactroot
     style="float: right;"
>
  <h1 id="hello">
    Hello
  </h1>
</div>

`);
  });

  it('renders inline <code> tags', () => {
    render(compiler('Text and <code>**code**</code>'));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<span data-reactroot>
  Text and
  <code>
    <strong>
      code
    </strong>
  </code>
</span>

`);
  });

  it('handles self-closing html inside parsable html (regression)', () => {
    render(
      compiler(
        '<a href="https://opencollective.com/react-dropzone/sponsor/0/website" target="_blank"><img src="https://opencollective.com/react-dropzone/sponsor/0/avatar.svg"></a>'
      )
    );

    expect(root.innerHTML).toMatchInlineSnapshot(`

<a data-reactroot
   href="https://opencollective.com/react-dropzone/sponsor/0/website"
   target="_blank"
>
  <img src="https://opencollective.com/react-dropzone/sponsor/0/avatar.svg">
</a>

`);
  });

  it('throws out HTML comments', () => {
    render(compiler('Foo\n<!-- blah -->'));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<p data-reactroot>
  Foo
</p>

`);
  });

  it('block HTML regression test', () => {
    render(
      compiler(`
<ul id="ProjectSubmenu">
<li><a href="/projects/markdown/" title="Markdown Project Page">Main</a></li>
<li><a href="/projects/markdown/basics" title="Markdown Basics">Basics</a></li>
<li><a class="selected" title="Markdown Syntax Documentation">Syntax</a></li>
<li><a href="/projects/markdown/license" title="Pricing and License Information">License</a></li>
<li><a href="/projects/markdown/dingus" title="Online Markdown Web Form">Dingus</a></li>
</ul>
`)
    );

    expect(root.innerHTML).toMatchInlineSnapshot(`

<ul data-reactroot
    id="ProjectSubmenu"
>
  <li>
    <a href="/projects/markdown/"
       title="Markdown Project Page"
    >
      Main
    </a>
  </li>
  <li>
    <a href="/projects/markdown/basics"
       title="Markdown Basics"
    >
      Basics
    </a>
  </li>
  <li>
    <a class="selected"
       title="Markdown Syntax Documentation"
    >
      Syntax
    </a>
  </li>
  <li>
    <a href="/projects/markdown/license"
       title="Pricing and License Information"
    >
      License
    </a>
  </li>
  <li>
    <a href="/projects/markdown/dingus"
       title="Online Markdown Web Form"
    >
      Dingus
    </a>
  </li>
</ul>

`);
  });

  it('handles svg', () => {
    render(
      compiler(fs.readFileSync(__dirname + '/docs/images/logo.svg', 'utf8'))
    );

    expect(root.innerHTML).toMatchInlineSnapshot(`

<svg data-reactroot
     width="246"
     height="369"
     xmlns="http://www.w3.org/2000/svg"
>
  <path d="M243.937.055a2 2 0 0 1 2.008 2.002v168.995c0 1.106-.814 2.388-1.802 2.855l-118.895 56.186c-.996.47-2.617.467-3.605 0L2.748 173.907c-.996-.47-1.803-1.742-1.803-2.855V2.057C.945.951 1.832.055 2.953.055h240.984zM110.391 139.367V66.383l-25.032 47.32h-9.843l-24.891-47.32v72.984h-15.68V42.055h20.18l25.594 49.64 25.804-49.64h19.688v97.312h-15.82zm104.101-48.656c0 9.562-.984 17.484-2.953 23.766-1.969 6.28-4.91 11.261-8.824 14.941-3.914 3.68-8.754 6.258-14.52 7.734-5.765 1.477-12.445 2.215-20.039 2.215h-27.21V42.055h26.929c7.781 0 14.59.82 20.426 2.46 5.836 1.641 10.699 4.36 14.59 8.157 3.89 3.797 6.796 8.8 8.718 15.012 1.922 6.21 2.883 13.886 2.883 23.027zm-18.289-16.508c-1.031-4.312-2.742-7.746-5.133-10.3-2.39-2.555-5.554-4.348-9.492-5.38-3.937-1.03-8.812-1.546-14.625-1.546h-9.21v67.359h9.21c5.906 0 10.828-.55 14.766-1.652 3.937-1.102 7.101-2.954 9.492-5.555 2.39-2.602 4.078-6.07 5.062-10.406.985-4.336 1.477-9.739 1.477-16.207 0-6.563-.516-12-1.547-16.313zM51.219 339.805c0 4.922-.574 9.187-1.723 12.797-1.148 3.609-2.93 6.597-5.344 8.964-2.414 2.368-5.507 4.114-9.28 5.239-3.774 1.125-8.263 1.687-13.466 1.687-1.265 0-2.718-.082-4.36-.246a60.81 60.81 0 0 1-5.097-.738 80.327 80.327 0 0 1-5.238-1.16A49.492 49.492 0 0 1 2 364.906l5.484-14.414c.704.375 1.653.762 2.848 1.16 1.195.399 2.45.762 3.762 1.09a56.72 56.72 0 0 0 3.972.844c1.336.234 2.496.351 3.48.351 2.673 0 4.864-.316 6.575-.949 1.711-.633 3.07-1.699 4.078-3.199 1.008-1.5 1.7-3.492 2.074-5.976.375-2.485.563-5.602.563-9.352V269h16.383v70.805zM151.688 339c0 5.484-.973 10.09-2.918 13.816-1.946 3.727-4.582 6.75-7.91 9.07-3.329 2.321-7.208 3.985-11.637 4.993-4.43 1.008-9.13 1.512-14.098 1.512-5.25 0-9.844-.493-13.781-1.477-3.938-.984-7.383-2.32-10.336-4.008-2.953-1.687-5.473-3.656-7.559-5.906A43.715 43.715 0 0 1 78 349.758l12.938-9.352a42.058 42.058 0 0 0 3.902 5.168 23.723 23.723 0 0 0 4.992 4.254c1.898 1.219 4.113 2.192 6.645 2.918 2.53.727 5.46 1.09 8.789 1.09 2.484 0 4.91-.234 7.277-.703s4.465-1.242 6.293-2.32c1.828-1.079 3.293-2.485 4.394-4.22 1.102-1.734 1.653-3.89 1.653-6.468 0-2.438-.528-4.477-1.582-6.117-1.055-1.64-2.473-3.024-4.254-4.149-1.781-1.125-3.867-2.062-6.258-2.812-2.39-.75-4.945-1.477-7.664-2.18a266.328 266.328 0 0 1-13.852-3.902c-4.265-1.336-7.968-3.035-11.109-5.098-3.14-2.062-5.613-4.687-7.418-7.875-1.805-3.187-2.707-7.265-2.707-12.234 0-4.406.75-8.38 2.25-11.918a24.403 24.403 0 0 1 6.61-9.07c2.906-2.508 6.527-4.43 10.863-5.766 4.336-1.336 9.316-2.004 14.941-2.004 4.219 0 8.074.387 11.567 1.16 3.492.774 6.656 1.899 9.492 3.375a32.403 32.403 0 0 1 7.629 5.485 37.377 37.377 0 0 1 5.906 7.418l-12.727 9.492c-2.578-4.125-5.625-7.22-9.14-9.282-3.516-2.062-7.805-3.093-12.868-3.093-5.484 0-9.832 1.125-13.042 3.375-3.211 2.25-4.817 5.437-4.817 9.562 0 2.063.434 3.785 1.3 5.168.868 1.383 2.204 2.59 4.009 3.621 1.804 1.032 4.078 1.957 6.82 2.778 2.742.82 5.988 1.675 9.738 2.566a193.01 193.01 0 0 1 8.473 2.25 67.888 67.888 0 0 1 7.805 2.777 38.465 38.465 0 0 1 6.785 3.727 22.237 22.237 0 0 1 5.308 5.168c1.477 2.016 2.637 4.371 3.48 7.066.845 2.696 1.267 5.824 1.267 9.387zM164 367.313l31.992-48.797L164.844 270h18.914l21.586 35.648L227.633 270h18.281l-31.5 48.094 31.36 49.219H227.07l-22.289-36.282-22.64 36.281z"
        fill="#444"
        fill-rule="evenodd"
  >
  </path>
</svg>

`);
  });

  it('handles nested HTML blocks of the same type (regression)', () => {
    render(
      compiler(`
<table>
<tbody>
    <tr>
    <td>Time</td>
    <td>Payment Criteria</td>
    <td>Payment</td>
    </tr>
    <tr>
    <td>Office Visit </td>
    <td>
        <ul>
        <li>
            Complete full visit and enroll
            <ul>
            <li>Enrolling is fun!</li>
            </ul>
        </li>
        </ul>
    </td>
    <td>$20</td>
    </tr>
</tbody>
</table>
            `)
    );

    expect(root.innerHTML).toMatchInlineSnapshot(`

<table data-reactroot>
  <tbody>
    <tr>
      <td>
        Time
      </td>
      <td>
        Payment Criteria
      </td>
      <td>
        Payment
      </td>
    </tr>
    <tr>
      <td>
        Office Visit
      </td>
      <td>
        <ul>
          <li>
            Complete full visit and enroll
            <ul>
              <li>
                Enrolling is fun!
              </li>
            </ul>
          </li>
        </ul>
      </td>
      <td>
        $20
      </td>
    </tr>
  </tbody>
</table>

`);
  });

  it('regression test for #136', () => {
    render(
      compiler(`
$25
<br>
<br>
<br>$50
<br>
<br>
<br>$50
<br>
<br>
<br>$50
<br>
<br>
<br>
            `)
    );

    expect(root.innerHTML).toMatchInlineSnapshot(`

<p data-reactroot>
  $25
  <br>
  <br>
  <br>
  $50
  <br>
  <br>
  <br>
  $50
  <br>
  <br>
  <br>
  $50
  <br>
  <br>
  <br>
</p>

`);
  });

  it('regression test for #170', () => {
    render(
      compiler(
        `<table>
<tbody>
<tr>
<td>a</td>
<td>b</td>
<td>c</td>
</tr>
<tr>
<td>left</td>
<td>
<p>Start of table</p>
<ul>
    <li>List 1</li>
    <li>
    <ul>
        <li>Nested List 1</li>
    </ul>
    </li>
    <li>
    <ul>
    <li>list 2</li>
    </ul>
    </li>
</ul>
</td>
<td>right</td>
</tr>
</tbody>
</table>`
      )
    );

    expect(root.innerHTML).toMatchInlineSnapshot(`

<table data-reactroot>
  <tbody>
    <tr>
      <td>
        a
      </td>
      <td>
        b
      </td>
      <td>
        c
      </td>
    </tr>
    <tr>
      <td>
        left
      </td>
      <td>
        <p>
          Start of table
        </p>
        <ul>
          <li>
            List 1
          </li>
          <li>
            <ul>
              <li>
                Nested List 1
              </li>
            </ul>
          </li>
          <li>
            <ul>
              <li>
                list 2
              </li>
            </ul>
          </li>
        </ul>
      </td>
      <td>
        right
      </td>
    </tr>
  </tbody>
</table>

`);
  });

  it('#140 self-closing HTML with indentation', () => {
    function DatePicker() {
      return <div className="datepicker" />;
    }

    render(
      compiler(
        [
          '<DatePicker ',
          '    biasTowardDateTime="2017-12-05T07:39:36.091Z"',
          '    timezone="UTC+5"',
          '/>',
        ].join('\n'),
        { overrides: { DatePicker } }
      )
    );

    expect(root.innerHTML).toMatchInlineSnapshot(`

<div data-reactroot
     class="datepicker"
>
</div>

`);
  });

  it('handles jsx attribute interpolation as a string', () => {
    function DatePicker({ endTime, startTime }) {
      return (
        <div>
          {startTime} to {endTime}
        </div>
      );
    }

    render(
      compiler(
        [
          '<DatePicker ',
          '    startTime={1514579720511}',
          '    endTime={"1514579720512"}',
          '/>',
        ].join('\n'),
        { overrides: { DatePicker } }
      )
    );

    expect(root.innerHTML).toMatchInlineSnapshot(`

<div data-reactroot>
  1514579720511
  to
  "1514579720512"
</div>

`);
  });

  it('handles jsx inside jsx interpolations', () => {
    function InterpolationTest({
      component,
      component2,
      component3,
      component4,
    }) {
      return (
        <div>
          {component} and {component2} and {component3} and {component4}
        </div>
      );
    }

    function Inner({ children, ...props }) {
      return (
        <div {...props} className="inner">
          {children}
        </div>
      );
    }

    render(
      compiler(
        [
          '<InterpolationTest ',
          '    component={<Inner children="bah" />}',
          '    component2={<Inner>blah</Inner>}',
          '    component3={<Inner disabled />}',
          '    component4={<Inner disabled={false} />}',
          '/>',
        ].join('\n'),
        { overrides: { Inner, InterpolationTest } }
      )
    );

    expect(root.innerHTML).toMatchInlineSnapshot(`

<div data-reactroot>
  <div class="inner">
    bah
  </div>
  and
  <div class="inner">
    blah
  </div>
  and
  <div disabled
       class="inner"
  >
  </div>
  and
  <div class="inner">
  </div>
</div>

`);
  });

  it('handles malformed HTML', () => {
    render(
      compiler(
        [
          '<g>',
          '<g>',
          '<path fill="#ffffff"/>',
          '</g>',
          '<path fill="#ffffff"/>',
        ].join('\n')
      )
    );

    expect(root.innerHTML).toMatchInlineSnapshot(`

<div data-reactroot>
  <g>
  </g>
  <g>
    <path fill="#ffffff">
    </path>
  </g>
  <path fill="#ffffff">
  </path>
</div>

`);
  });

  it('allows whitespace between attribute and value', () => {
    render(
      compiler(
        [
          '<div class = "foo" style= "background:red;" id ="baz">',
          'Bar',
          '</div>',
        ].join('\n')
      )
    );

    expect(root.innerHTML).toMatchInlineSnapshot(`

<div data-reactroot
     class="foo"
     id="baz"
     style="background: red;"
>
  Bar
</div>

`);
  });

  it('handles a raw hashtag inside HTML', () => {
    render(compiler(['"<span>#</span>"'].join('\n')));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<span data-reactroot>
  "
  <span>
    #
  </span>
  "
</span>

`);
  });

  it('handles a heading inside HTML', () => {
    render(compiler(['"<span># foo</span>"'].join('\n')));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<span data-reactroot>
  "
  <span>
    <h1 id="foo">
      foo
    </h1>
  </span>
  "
</span>

`);
  });

  it('does not parse the inside of <style> blocks', () => {
    render(
      compiler(
        ['<style>', '  .bar {', '    color: red;', '  }', '</style>'].join('\n')
      )
    );

    expect(root.innerHTML).toMatchInlineSnapshot(`

<style data-reactroot>
  .bar {
    color: red;
  }
</style>

`);
  });

  it('does not parse the inside of <script> blocks', () => {
    render(compiler(['<script>', '  new Date();', '</script>'].join('\n')));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<script data-reactroot>
  new Date();
</script>

`);
  });

  it('handles nested tags of the same type with attributes', () => {
    render(
      compiler(
        ['<div id="foo">', '  <div id="bar">Baz</div>', '</div>'].join('\n')
      )
    );

    expect(root.innerHTML).toMatchInlineSnapshot(`

<div data-reactroot
     id="foo"
>
  <div id="bar">
    Baz
  </div>
</div>

`);
  });

  it('#180 handles invalid character error with angle brackets', () => {
    render(compiler('1<2 or 2>1'));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<span data-reactroot>
  1&lt;2 or 2&gt;1
</span>

`);
  });

  it('#181 handling of figure blocks', () => {
    render(
      compiler(
        `
<figure>
![](//placehold.it/300x200)
<figcaption>This is a placeholder image</figcaption>
</figure>
            `.trim()
      )
    );

    expect(root.innerHTML).toMatchInlineSnapshot(`

<figure data-reactroot>
  <img src="//placehold.it/300x200">
  <figcaption>
    This is a placeholder image
  </figcaption>
</figure>

`);
  });

  it('#185 handles block syntax MD + HTML inside HTML', () => {
    render(
      compiler(
        `
<details>
<summary>Solution</summary>

\`\`\`jsx
import styled from 'styled-components';
\`\`\`
</details>
                    `.trim()
      )
    );

    expect(root.innerHTML).toMatchInlineSnapshot(`

<details data-reactroot>
  <summary>
    Solution
  </summary>
  <pre>
    <code class="lang-jsx">
      import styled from 'styled-components';
    </code>
  </pre>
</details>

`);
  });

  it('#207 handles tables inside HTML', () => {
    render(
      compiler(`
<details>
<summary>Click here</summary>

| Heading 1 | Heading 2 |
| --------- | --------- |
| Foo       | Bar       |

</details>
                `)
    );

    // expect('').toMatchInlineSnapshot();
    expect(root.innerHTML).toMatchInlineSnapshot(`

<details data-reactroot>
  <summary>
    Click here
  </summary>
  <table>
    <thead>
      <tr>
        <th scope="col">
          Heading 1
        </th>
        <th scope="col">
          Heading 2
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          Foo
        </td>
        <td>
          Bar
        </td>
      </tr>
    </tbody>
  </table>
</details>

`);
  });

  it('#185 misc regression test', () => {
    render(
      compiler(
        `
<details>
<summary>View collapsed content</summary>

# Title h1

## Title h2

Text content

* list 1
* list 2
* list 3


</details>
                    `.trim()
      )
    );

    expect(root.innerHTML).toMatchInlineSnapshot(`

<details data-reactroot>
  <summary>
    View collapsed content
  </summary>
  <h1 id="title-h1">
    Title h1
  </h1>
  <h2 id="title-h2">
    Title h2
  </h2>
  <p>
    Text content
  </p>
  <ul>
    <li>
      list 1
    </li>
    <li>
      list 2
    </li>
    <li>
      list 3
    </li>
  </ul>
</details>

`);
  });

  it('multiline left-trims by the same amount as the first line', () => {
    render(
      compiler(`
<div>
\`\`\`kotlin
fun main() {
    print("Hello world")
}
\`\`\`
</div>
                `)
    );

    expect(root.innerHTML).toMatchInlineSnapshot(`

<div data-reactroot>
  <pre>
    <code class="lang-kotlin">
      fun main() {
    print("Hello world")
}
    </code>
  </pre>
</div>

`);
  });

  it('nested lists work inside html', () => {
    render(
      compiler(`
<div>
* hi
* hello
    * how are you?
</div>
                `)
    );

    expect(root.innerHTML).toMatchInlineSnapshot(`

<div data-reactroot>
  <ul>
    <li>
      hi
    </li>
    <li>
      hello
      <ul>
        <li>
          how are you?
        </li>
      </ul>
    </li>
  </ul>
</div>

`);
  });

  it('#214 nested paragraphs work inside html', () => {
    render(compiler(['<div>', 'Hello', '', 'World', '</div>'].join('\n')));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<div data-reactroot>
  <p>
    Hello
  </p>
  <p>
    World
  </p>
</div>

`);
  });
});

describe('horizontal rules', () => {
  it('should handle the various syntaxes', () => {
    render(
      compiler(
        [
          '* * *',
          '***',
          '*****',
          '- - -',
          '---------------------------------------',
        ].join('\n\n')
      )
    );

    expect(root.innerHTML).toMatchInlineSnapshot(`

<div data-reactroot>
  <hr>
  <hr>
  <hr>
  <hr>
  <hr>
</div>

`);
  });
});

describe('line breaks', () => {
  it('should be added for 2-space sequences', () => {
    render(compiler(['hello  ', 'there'].join('\n')));

    const lineBreak = root.querySelector('br');

    expect(lineBreak).not.toBe(null);
  });
});

describe('fenced code blocks', () => {
  it('should be handled', () => {
    render(compiler(['```js', 'foo', '```'].join('\n')));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<pre data-reactroot>
  <code class="lang-js">
    foo
  </code>
</pre>

`);
  });
});

describe('indented code blocks', () => {
  it('should be handled', () => {
    render(compiler('    foo\n\n'));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<pre data-reactroot>
  <code>
    foo
  </code>
</pre>

`);
  });
});

describe('inline code blocks', () => {
  it('should be handled', () => {
    render(compiler('`foo`'));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<code data-reactroot>
  foo
</code>

`);
  });
});

describe('footnotes', () => {
  it('should handle conversion of references into links', () => {
    render(compiler(['foo[^abc] bar', '', '[^abc]: Baz baz'].join('\n')));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<div data-reactroot>
  <p>
    foo
    <a href="#abc">
      <sup>
        abc
      </sup>
    </a>
    bar
  </p>
  <footer>
    <div id="abc">
      abc
      : Baz baz
    </div>
  </footer>
</div>

`);
  });

  it('should inject the definitions in a footer at the end of the root', () => {
    render(compiler(['foo[^abc] bar', '', '[^abc]: Baz baz'].join('\n')));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<div data-reactroot>
  <p>
    foo
    <a href="#abc">
      <sup>
        abc
      </sup>
    </a>
    bar
  </p>
  <footer>
    <div id="abc">
      abc
      : Baz baz
    </div>
  </footer>
</div>

`);
  });

  it('should handle single word footnote definitions', () => {
    render(compiler(['foo[^abc] bar', '', '[^abc]: Baz'].join('\n')));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<div data-reactroot>
  <p>
    foo
    <a href="#abc">
      <sup>
        abc
      </sup>
    </a>
    bar
  </p>
  <footer>
    <div id="abc">
      abc
      : Baz
    </div>
  </footer>
</div>

`);
  });
});

describe('options.forceBlock', () => {
  it('treats given markdown as block-context', () => {
    render(
      compiler("Hello. _Beautiful_ day isn't it?", {
        forceBlock: true,
      })
    );

    expect(root.innerHTML).toMatchInlineSnapshot(`

<p data-reactroot>
  Hello.
  <em>
    Beautiful
  </em>
  day isn't it?
</p>

`);
  });
});

describe('options.forceInline', () => {
  it('treats given markdown as inline-context, passing through any block-level markdown syntax', () => {
    render(compiler('# You got it babe!', { forceInline: true }));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<span data-reactroot>
  # You got it babe!
</span>

`);
  });
});

describe('options.createElement', () => {
  it('should render a <custom> element if render function overrides the element type', () => {
    render(
      compiler('Hello', {
        createElement(type, props, children) {
          return React.createElement('custom', props, children);
        },
      })
    );

    // The tag name is always in the upper-case form.
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/tagName
    expect(root.children[0].tagName).toBe('CUSTOM');
  });

  it('should render an empty <div> element', () => {
    render(
      compiler('Hello', {
        createElement() {
          return React.createElement('div');
        },
      })
    );

    expect(root.children[0].innerHTML).toBe('');
    expect(root.children[0].children.length).toBe(0);
  });

  it('should throw error if render function returns null', () => {
    expect(() => {
      render(
        compiler('Hello', {
          createElement: () => null,
        })
      );
    }).toThrow(/Invalid component element/);
  });
});

describe('options.slugify', () => {
  it('should use a custom slugify function rather than the default if set and valid', () => {
    render(compiler('# 中文', { slugify: str => str }));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<h1 data-reactroot
    id="中文"
>
  中文
</h1>

`);
  });

  it('should use the default function if unset', () => {
    render(compiler('# 中文'));

    expect(root.innerHTML).toMatchInlineSnapshot(`

<h1 data-reactroot
    id
>
  中文
</h1>

`);
  });

  it('should throw error if invalid', () => {
    expect(() => {
      render(compiler('# 中文', { slugify: 'invalid' }));
    }).toThrow(/options\.slugify is not a function/);
  });
});

describe('overrides', () => {
  it('should substitute the appropriate JSX tag if given a component', () => {
    class FakeParagraph extends React.Component {
      render() {
        return <p className="foo">{this.props.children}</p>;
      }
    }

    render(
      compiler('Hello.\n\n', {
        overrides: { p: { component: FakeParagraph } },
      })
    );

    expect(root.children[0].className).toBe('foo');
    expect(root.children[0].textContent).toBe('Hello.');
  });

  it('should accept an override shorthand if props do not need to be overidden', () => {
    class FakeParagraph extends React.Component {
      render() {
        return <p className="foo">{this.props.children}</p>;
      }
    }

    render(compiler('Hello.\n\n', { overrides: { p: FakeParagraph } }));

    expect(root.children[0].className).toBe('foo');
    expect(root.children[0].textContent).toBe('Hello.');
  });

  it('should add props to the appropriate JSX tag if supplied', () => {
    render(
      compiler('Hello.\n\n', {
        overrides: { p: { props: { className: 'abc' } } },
      })
    );

    expect(root.children[0].className).toBe('abc');
    expect(root.children[0].textContent).toBe('Hello.');
  });

  it('should add props to pre & code tags if supplied', () => {
    render(
      compiler(['```', 'foo', '```'].join('\n'), {
        overrides: {
          code: {
            props: {
              'data-foo': 'bar',
            },
          },

          pre: {
            props: {
              className: 'abc',
            },
          },
        },
      })
    );

    expect(root.innerHTML).toMatchInlineSnapshot(`

<pre data-reactroot
     class="abc"
>
  <code data-foo="bar">
    foo
  </code>
</pre>

`);
  });

  it('should substitute pre & code tags if supplied with an override component', () => {
    class OverridenPre extends React.Component {
      render() {
        const { children, ...props } = this.props;

        return (
          <pre {...props} data-bar="baz">
            {children}
          </pre>
        );
      }
    }

    class OverridenCode extends React.Component {
      render() {
        const { children, ...props } = this.props;

        return (
          <code {...props} data-baz="fizz">
            {children}
          </code>
        );
      }
    }

    render(
      compiler(['```', 'foo', '```'].join('\n'), {
        overrides: {
          code: {
            component: OverridenCode,
            props: {
              'data-foo': 'bar',
            },
          },

          pre: {
            component: OverridenPre,
            props: {
              className: 'abc',
            },
          },
        },
      })
    );

    expect(root.innerHTML).toMatchInlineSnapshot(`

<pre data-reactroot
     class="abc"
     data-bar="baz"
>
  <code data-foo="bar"
        data-baz="fizz"
  >
    foo
  </code>
</pre>

`);
  });

  it('should be able to override gfm task list items', () => {
    render(
      compiler('- [ ] foo', {
        overrides: { li: { props: { className: 'foo' } } },
      })
    );
    const $element = root.querySelector('li');

    expect($element.outerHTML).toMatchInlineSnapshot(`

<li class="foo">
  <input type="checkbox"
         readonly
         value="on"
  >
  foo
</li>

`);
  });

  it('should be able to override gfm task list item checkboxes', () => {
    render(
      compiler('- [ ] foo', {
        overrides: { input: { props: { className: 'foo' } } },
      })
    );
    const $element = root.querySelector('input');

    expect($element.outerHTML).toMatchInlineSnapshot(`

<input type="checkbox"
       class="foo"
       readonly
       value="on"
>

`);
  });
});

it('handles a holistic example', () => {
  const md = fs.readFileSync(__dirname + '/fixture.md', 'utf8');
  render(compiler(md));

  expect(root.innerHTML).toMatchSnapshot();
});