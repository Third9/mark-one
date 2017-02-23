import React from 'react';

import ReactQuill from 'react-quill';
import marked from 'marked';

// stylesheet
import '../../../node_modules/quill/dist/quill.snow.css';
import './editor.css';
import '../../../node_modules/github-markdown-css/github-markdown.css';


export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
    });

    this.state = { editorHtml: '', previewHtml: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.imperativelyInsertTextAtCursor = this.imperativelyInsertTextAtCursor.bind(this);
  }

  handleChange(content, delta, source, editor) {
    const texts = editor.getText();

    console.log('html:', content);
    // console.log('delta', delta)
    // console.log('source', source)
    // console.log('editor', editor)

    // console.log('editor.getBounds', editor.getBounds())
    // console.log('editor.getContents', editor.getContents())
    // console.log('editor.getSelection', editor.getSelection())
    console.log('editor.getText:', texts);

    // markedown renderer
    const result = marked(texts);
    console.log('result:', result);

    this.setState({ editorHtml: content, previewHtml: result });
  }

  handleClick(event) {
    console.log('click', event);
  }

  imperativelyInsertTextAtCursor() {
    const reactQuill = this.editor;
    const editor = reactQuill.getEditor();
    console.log('editor: ', editor);

    const { index } = editor.getSelection();
    console.log('index: ', index);

    editor.insertText(index, 'snip');
  }

  render() {
    return (
      <div>
        <div className="container">
          <ReactQuill
            className="editor"
            ref={(ref) => (this.editor = ref)}
            theme={'snow'}
            onChange={this.handleChange}
            onClick={this.handleClick}
            value={this.state.editorHtml}
            modules={this.props.modules}
            formats={this.props.formats}
            placeholder={this.props.placeholder}
          />
          <article
            className="preview markdown-body"
            dangerouslySetInnerHTML={{ __html: this.state.previewHtml }}
          />
        </div>
        <button onClick={this.imperativelyInsertTextAtCursor}>Click BTN</button>
      </div>
    );
  }
}

Editor.propTypes = {
  modules: React.PropTypes.node,
  formats: React.PropTypes.node,
};

Editor.defaultProps = {
  modules: {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, false] }, { font: [] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' },
        { indent: '-1' }, { indent: '+1' }],
      ['blockquote', 'code-block'],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  },

  formats: [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'indent',
    'blockquote', 'code-block',
    'link', 'image', 'video',
  ],
};

Editor.propTypes = {
  placeholder: React.PropTypes.string,
};
