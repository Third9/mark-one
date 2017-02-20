import React from 'react';
import ReactQuill from 'react-quill';

import '../../../node_modules/quill/dist/quill.snow.css';

export class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorHtml: '' };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(html) {
    this.setState({ editorHtml: html });
  }

  render() {
    return (
      <ReactQuill
        theme={'snow'}
        onChange={this.handleChange}
        value={this.state.editorHtml}
        modules={Editor.modules}
        formats={Editor.formats}
        placeholder={this.props.placeholder}
      />
    );
  }
}

Editor.modules = {
  toolbar: [
    [{ header: [1, 2, false] }, { font: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' },
        { indent: '-1' }, { indent: '+1' }],
    ['link', 'image'],
    ['clean'],
  ],
};

Editor.formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image',
];

Editor.propTypes = {
  placeholder: React.PropTypes.string,
};
