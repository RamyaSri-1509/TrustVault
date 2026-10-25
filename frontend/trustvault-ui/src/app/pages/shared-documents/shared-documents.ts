
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

interface SharedDocument {
  id: number;
  name: string;
  owner: string;
  sharedDate: string;
  access: 'Read' | 'Edit';
  size: string;
}

@Component({
  selector: 'app-shared-documents',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './shared-documents.html',
  styleUrl: './shared-documents.scss'
})
export class SharedDocuments {
  searchText = '';

  documents: SharedDocument[] = [
    {
      id: 1,
      name: 'Project Requirements.pdf',
      owner: 'Ananya Sharma',
      sharedDate: '24 Oct 2026',
      access: 'Read',
      size: '1.5 MB'
    },
    {
      id: 2,
      name: 'Application Design.docx',
      owner: 'Rahul Kumar',
      sharedDate: '23 Oct 2026',
      access: 'Edit',
      size: '920 KB'
    },
    {
      id: 3,
      name: 'Project Timeline.xlsx',
      owner: 'Priya Reddy',
      sharedDate: '21 Oct 2026',
      access: 'Read',
      size: '640 KB'
    },
    {
      id: 4,
      name: 'Meeting Notes.pdf',
      owner: 'Ananya Sharma',
      sharedDate: '20 Oct 2026',
      access: 'Edit',
      size: '480 KB'
    }
  ];

  get filteredDocuments(): SharedDocument[] {
    const query = this.searchText.trim().toLowerCase();

    if (!query) {
      return this.documents;
    }

    return this.documents.filter(doc =>
      [doc.name, doc.owner, doc.access].some(
        value => value.toLowerCase().includes(query)
      )
    );
  }
}
