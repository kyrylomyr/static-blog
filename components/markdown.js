import React from "react";
import ReactMarkdown from "react-markdown";
import gfm from 'remark-gfm';
import SyntaxHighlighter from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/hljs";

export default function Markdown({ content }) {
    return <ReactMarkdown className="markdown" source={content} plugins={[gfm]} renderers={{ code: CodeRenderer, image: ImageRenderer }} />
}

function CodeRenderer({ language, value }) {
    return (
        <SyntaxHighlighter language={language} style={darcula}>
            {value}
        </SyntaxHighlighter>
    );
}

function ImageRenderer(props) {
    return <img {...props} />;
}