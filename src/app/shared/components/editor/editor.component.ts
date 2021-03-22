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
import SimpleImage from '@editorjs/simple-image';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  constructor(private alertService: AlertService) { }

  editor: EditorJS;
  editorConfig: EditorConfig = {
    autofocus: true,
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
      // warning: Warning,
      Marker: {
        class: Marker,
      },
      image: {
        class: SimpleImage,
        inlineToolbar: true
      }
    }
  };

  ngOnInit() {
    this.editor = new EditorJS(this.editorConfig);
  }

  saveAsDraft() {
    this.editor.save().then(outputData => {
      console.log(outputData);
    }).catch(error => {
      console.error(error);
    })
  }
  publish() { }

  clearAll() {
    this.alertService.confirmation("Clear all", "Do you want to clear all of your content? This actions is not reversible!", "Clear", "Cancel").then(result => {
      if (result.isConfirmed) {
        this.editor.clear();
      }
    }).catch(error => { console.error(error) })
  }
}
