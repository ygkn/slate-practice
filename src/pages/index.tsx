import React, { useMemo, useState, VFC } from 'react';
import { createEditor, Node } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';

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
      <Editable />
    </Slate>
  );
};

export default IndexPage;
