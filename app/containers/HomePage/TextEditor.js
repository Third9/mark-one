import React from 'react';

import ReactQuill from 'react-quill';
import MarkdownIt from 'markdown-it';

// stylesheet
import '../../../node_modules/quill/dist/quill.snow.css';
import './editor.css';
import '../../../node_modules/github-markdown-css/github-markdown.css';


export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    //marked.setOptions({
    //  renderer: new marked.Renderer(),
    //  gfm: true,
    //  tables: true,
    //  breaks: false,
    //  pedantic: false,
    //  sanitize: false,
    //  smartLists: true,
    //  smartypants: false,
    //});
    this.md = new MarkdownIt;

    this.state = { editorHtml: '', previewHtml: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleKeyPress = this.handleKeyPress(this);
    this.imperativelyInsertTextAtCursor = this.imperativelyInsertTextAtCursor.bind(this);
  }

  handleChange(content, delta, source, editor) {
    const texts = editor.getText();

    console.log('html:', content);
    console.log('delta', delta);
    console.log('source', source);
    console.log('editor', editor);

    console.log('editor.getBounds', editor.getBounds(1));
    console.log('editor.getContents', editor.getContents());
    //console.log('editor.getEditor', editor.getEditor());
    //console.log('editor.getLine', editor.getLine());
    console.log('editor.getText:', texts);

    // markedown renderer
    //const result = marked(content);
    const result = this.md.render(texts);
    console.log('result:', result);

    this.setState({ editorHtml: content, previewHtml: result });
  }

  handleKeyPress(event) {
    console.log('Key', event);
  }

  handleClick(event) {
    console.log('click', event);
  }

  handleFocus(range, source, editor) {
    console.log("Focus", range);
    console.log("Focus", source);
    console.log("Focus", editor);
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
            onFocus={this.handleFocus}
            onKeyPress={this.handleKeyPress}
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
        <div contentEditable="true" style={{
          width: '300',
          height: '200',
          border: '1',
          borderStyle: 'solid'
        }}></div>
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
