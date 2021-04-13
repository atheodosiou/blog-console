import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import EditorJS, { EditorConfig, OutputData } from '@editorjs/editorjs';
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
import ImageTool from '@editorjs/image';
import Warning from '@editorjs/warning';
import Marker from '@editorjs/marker';
import SimpleImage from '@editorjs/simple-image';
import { AlertService } from '../../services/alert.service';
import { Media } from '../../models/media.model';
import { BlogService, GoToEnum } from '../../services/blog.service';
import { Category } from '../../models/category.model';
import { Post } from '../../models/post.model';
import { Router } from '@angular/router';

@Component({
  selector: 'editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, AfterViewInit {

  @Input() set post(value: Post) {
    this.incomingPost = value;
  }
  constructor(private alertService: AlertService, private blogService: BlogService, private router: Router) { }
  title: string;
  preview: string;
  mediaFiles: Media[] = [];
  featuredImageUrl: string;
  tags: string[] = [];
  categories: Category[] = [];
  selectedCategory: Category;
  newCategoryName: string;
  status: 'published' | 'draft' = 'draft';
  incomingPost: Post;
  showCategoryInput: boolean = false;

  editor: EditorJS;
  editorConfig: EditorConfig = {
    autofocus: true,
    holder: 'editorjs',
    placeholder: 'Let`s write an awesome story!',
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
      image: SimpleImage
    },
  };

  invalidFields = {
    title: false,
    preview: false,
    body: false
  };

  ngAfterViewInit() {
    if (this.incomingPost?.content) {
      this.editorConfig.data = this.incomingPost.content;
      this.title = this.incomingPost.title;
      this.preview = this.incomingPost.preview;
      this.featuredImageUrl = this.incomingPost.imageUrl;
      this.selectedCategory = this.incomingPost.category;
      this.tags = this.incomingPost.tags;
    }
    this.editor = new EditorJS(this.editorConfig);
  }

  ngOnInit() {

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

  async saveAsDraft() {
    if (await (await this.checkRequiredFields()).ok) {
      this.status = 'draft';
      const post = await this.createReqeustBody();
      this.blogService.addPost(post).subscribe(res => {
        console.log("Post saved!", res);
        this.alertService.success("Draft saved successfully.", "", 2000, true);
      }, error => {
        this.alertService.error("Failed to save draft.", "", 3000, true);
        console.log(error);
      });
    } else {
      this.alertService.error("Please check all required fields.", "", 3000, true);
    }
  }

  async publish() {
    if (await (await this.checkRequiredFields()).ok) {
      this.status = 'published';
      const post = await this.createReqeustBody();
      this.blogService.addPost(post).subscribe(res => {
        console.log("Post added!", res);
        this.alertService.success("New article published successfully.", "", 2000, true);
        this.blogService.goToPosts$.next(GoToEnum.DASHBOARD);
      }, error => {
        this.alertService.error("Faild to publish new article.", "", 3000, true);
        console.log(error);
      });
    } else {
      this.alertService.error("Please check all required fields.", "", 3000, true);
    }
  }

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
        this.newCategoryName = null;
        this.showCategoryInput = false;
      }, error => {
        this.alertService.error("Category was not created successfully", "", 3000, true);
        console.log(error);
      });
    }
  }

  removeImage(file: Media) {
    if (file?._id) {
      this.blogService.removeImageFile(file?._id).subscribe(res => {
        const index = this.mediaFiles.indexOf(file);
        if (index !== -1) {
          this.mediaFiles.splice(index, 1);
          this.alertService.success("Image removed successfully", "", 2000, true);
        }
      }, error => {
        this.alertService.error("Image could no be removed successfully", "", 3000, true);
        console.log(error);
      })
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

  /**
   * Returns true if required fields are ok,
   * false otherwise
   */
  private async checkRequiredFields(): Promise<{ ok: boolean, errors: { field: string, error: string }[] }> {
    const result: { ok: boolean, errors: { field: string, error: string }[] } = { ok: true, errors: [] };
    if (!this.title || this.title === '') {
      result.errors.push({ field: 'title', error: 'Title is required.' });
      this.invalidFields.title = true;
    }
    if (!this.preview || this.title === '') {
      result.errors.push({ field: 'preview', error: 'Description is required.' });
      this.invalidFields.preview = true;
    }
    const editorValue = await this.editor.save();
    if (!editorValue || editorValue.blocks.length === 0) {
      result.errors.push({ field: 'body', error: 'Body is required.' });
      this.invalidFields.body = true;
    }
    if (result.errors.length > 0) {
      result.ok = false;
    }
    return result;
  }

  private async createReqeustBody(): Promise<Post> {
    return {
      title: this.title,
      preview: this.preview,
      content: await this.editor.save(),
      imageUrl: this.featuredImageUrl,
      status: this.status,
      tags: this.tags,
      category: this.selectedCategory
    };
  }
}
