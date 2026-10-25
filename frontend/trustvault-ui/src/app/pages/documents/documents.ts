
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

interface DocumentItem {
  id: number;
  name: string;
  category: string;
  size: string;
  modified: string;
  access: string;
}

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './documents.html',
  styleUrl: './documents.scss'
})
export class Documents {
  searchText = '';

  documents: DocumentItem[] = [
    {
      id: 1,
      name: 'Project Proposal.pdf',
      category: 'Projects',
      size: '2.4 MB',
      modified: '25 Oct 2026',
      access: 'Private'
    },
    {
      id: 2,
      name: 'Requirements.docx',
      category: 'Reports',
      size: '840 KB',
      modified: '24 Oct 2026',
      access: 'Shared'
    },
    {
      id: 3,
      name: 'Design Document.pdf',
      category: 'Design',
      size: '1.8 MB',
      modified: '22 Oct 2026',
      access: 'Private'
    }
  ];

  get filteredDocuments(): DocumentItem[] {
    const query = this.searchText.trim().toLowerCase();

    if (!query) {
      return this.documents;
    }

    return this.documents.filter(doc =>
      [doc.name, doc.category, doc.access]
        .some(value => value.toLowerCase().includes(query))
    );
  }

  iconForDocument(name: string): string {
    const extension = name.split('.').pop()?.toLowerCase();

    if (extension === 'pdf') {
      return 'picture_as_pdf';
    }

    if (extension === 'xlsx' || extension === 'xls' || extension === 'csv') {
      return 'table_chart';
    }

    if (extension === 'ppt' || extension === 'pptx') {
      return 'slideshow';
    }

    return 'description';
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    this.documents = [
      {
        id: Date.now(),
        name: file.name,
        category: 'Uncategorized',
        size: `${(file.size / 1024).toFixed(1)} KB`,
        modified: new Date().toLocaleDateString('en-GB'),
        access: 'Private'
      },
      ...this.documents
    ];

    input.value = '';
  }
}
