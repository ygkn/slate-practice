import React, { FC, useMemo, useState, VFC } from 'react';
import { createEditor, Editor, Node, Transforms } from 'slate';
import { Editable, RenderElementProps, Slate, withReact } from 'slate-react';

const CodeElement: FC<RenderElementProps> = (props) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

const DefaultElement: FC<RenderElementProps> = (props) => {
  return <p {...props.attributes}>{props.children}</p>;
};

const renderElement = (props: RenderElementProps): JSX.Element => {
  switch (props.element.type) {
    case 'code':
      return <CodeElement {...props} />;
    default:
      return <DefaultElement {...props} />;
  }
};

const IndexPage: VFC = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState<Node[]>([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ]);

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(newValue) => setValue(newValue)}
    >
      <Editable
        renderElement={renderElement}
        onKeyDown={(event) => {
          if (event.key === '`' && event.ctrlKey) {
            event.preventDefault();

            const [match] = Editor.nodes(editor, {
              match: (n) => n.type === 'code',
            });

            Transforms.setNodes(
              editor,
              { type: match ? 'paragraph' : 'code' },
              { match: (n) => Editor.isBlock(editor, n) }
            );
          }
        }}
      />
    </Slate>
  );
};

export default IndexPage;
