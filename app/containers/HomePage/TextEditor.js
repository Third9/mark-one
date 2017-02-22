import React from 'react';
import ReactQuill from 'react-quill';

import commonMark from 'commonmark';
// import ReactRenderer from 'commonmark-react-renderer';

import '../../../node_modules/quill/dist/quill.snow.css';
import './editor.css';


export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorHtml: '', previewHtml: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.imperativelyInsertTextAtCursor = this.imperativelyInsertTextAtCursor.bind(this);
  }

  handleChange(content, delta, source, editor) {
    // Markdown parser
    const reader = new commonMark.Parser();
    const writer = new commonMark.HtmlRenderer({ sourcepos: true });
    const texts = editor.getText();

    console.log('html', content);
    // console.log('delta', delta)
    // console.log('source', source)
    // console.log('editor', editor)

    // console.log('editor.getBounds', editor.getBounds())
    // console.log('editor.getContents', editor.getContents())
    // console.log('editor.getSelection', editor.getSelection())
    console.log('editor.getText', texts);
    // markedown renderer
    const parsed = reader.parse(texts); // parsed is a 'Node' tree
    console.log('parsed', parsed);

    // transform parsed if you like...
    // let walker = parsed.walker();
    // let event, node;

    // while ((event = walker.next())) {
    //   node = event.node;
    //   console.log('node', node)

    // }

    const result = writer.render(parsed); // result is a String
    console.log('result', result);

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
          <pre
            className="preview"
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
