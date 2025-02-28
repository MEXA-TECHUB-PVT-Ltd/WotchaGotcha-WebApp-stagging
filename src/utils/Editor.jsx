import React, { useMemo } from "react";
import ReactEditor from "react-quill";

export const Editor = ({ value, onChange, ...rest }) => {
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "clean",
  ];

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [2, 3, 4, false] }],
          ["bold", "italic", "underline", "blockquote"],
          [{ color: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image"],
          ["clean"],
        ],
      },
      clipboard: {
        matchVisual: true,
      },
    }),
    []
  );

  return (
    <ReactEditor
      theme="snow"
      value={value}
      onChange={onChange}
      formats={formats}
      modules={modules}
      style={{
        height: "90%",
      }}
      {...rest}
    />
  );
};
