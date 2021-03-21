import { Component, OnInit } from '@angular/core';
import EditorJS, { EditorConfig } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Link from '@editorjs/link';
import Raw from '@editorjs/raw';
import Checklist from '@editorjs/checklist';
import List from '@editorjs/list';
import Embed from '@editorjs/embed';
import Quote from '@editorjs/quote';
import Code from '@editorjs/code';
import Underline from '@editorjs/underline';
import Delimiter from '@editorjs/delimiter';
import Table from '@editorjs/table';
import InlineCode from '@editorjs/inline-code';
import Paragraph from '@editorjs/paragraph';
import Warning from '@editorjs/warning';
import Marker from '@editorjs/marker';

@Component({
  selector: 'editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  constructor() { }
  editor: EditorJS;
  editorConfig: EditorConfig = {
    holder: 'editorjs',
    tools: {
      header: Header,
      link: Link,
      raw: Raw,
      checklist: {
        class: Checklist,
        inlineToolbar: true
      },
      list: List,
      embed: Embed,
      quote: Quote,
      code: Code,
      underline: Underline,
      delimiter: Delimiter,
      table: Table,
      inlineCode: {
        class: InlineCode
      },
      paragraph: {
        class: Paragraph,
        inlineToolbar: true,
      },
      warning: Warning,
      Marker: {
        class: Marker,
      }
    }
  };

  ngOnInit() {
    this.editor = new EditorJS(this.editorConfig);
  }
}
