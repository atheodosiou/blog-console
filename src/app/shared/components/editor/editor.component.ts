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
import { Media } from '../../models/media.model';
import { BlogService } from '../../services/blog.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  constructor(private alertService: AlertService, private blogService: BlogService) { }
  mediaFiles: Media[] = [];
  featuredImageUrl: string;
  tags: string[] = [];
  categories: Category[] = [];
  selectedCategory: Category;
  newCategoryName: string;

  showCategoryInput: boolean = false;

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
    this.getImageGallery().then(res => {
      if (this.mediaFiles) {
        this.mediaFiles = [];
      }
      this.mediaFiles = res;
    }).catch(error => {
      this.alertService.error("Faild to load gallery images", "", 3000, true);
      console.log(error);
    });
    this.blogService.getCategories().subscribe(categories => {
      this.categories = categories;
    }, error => {
      this.alertService.error("Faild to load categories", "", 3000, true);
      console.log(error);
    });
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

  onFileUpload(file: Media) {
    this.mediaFiles.unshift(file);
  }

  copyText(text: string) {
    navigator.clipboard.writeText(text).then(data => {
      this.alertService.success("Url copied successfully!", "", 2000, true);
    }).catch(er => {
      this.alertService.error("Faild to copy url!", "", 3000, true);
    });
  }

  refreshGallery() {
    this.getImageGallery().then(res => {
      if (this.mediaFiles) {
        this.mediaFiles = [];
      }
      this.mediaFiles = res;
      this.alertService.success("Image gallery refreshed!", "", 2000, true);
    }).catch(error => {
      this.alertService.error("Faild to load gallery images", "", 3000, true);
      console.log(error);
    });
  }

  onEnter(e: any) {
    this.tags.push(e.target.value);
    e.target.value = "";
  }

  removeTag(tag: string) {
    const index = this.tags.indexOf(tag);
    if (index !== -1) {
      this.tags.splice(index, 1);
    }
  }

  openImage(url: string) {
    window.open(url, "_blank");
  }

  saveCategory() {
    if (this.newCategoryName) {
      this.blogService.addCategory(this.newCategoryName).subscribe(res => {
        this.categories.push(res);
        this.alertService.success("Category created successfully.", "", 2000, true);
        this.newCategoryName=null;
        this.showCategoryInput = false;
      }, error => {
        this.alertService.error("Category was not created successfully", "", 3000, true);
        console.log(error);
      });
    }
  }

  private getImageGallery(): Promise<Media[]> {
    return new Promise<Media[]>((resolve, reject) => {
      this.blogService.getAllImages().subscribe(res => {
        resolve(res.media);
      }, error => {
        reject(error);
      })
    });
  }
}
