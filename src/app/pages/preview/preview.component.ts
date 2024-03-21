import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-preview',

  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css'],
})
export class PreviewComponent implements OnInit {
  @ViewChild('fileInputEfly', { static: false }) fileInputEfly!: ElementRef;
  @ViewChild('otherFiles', { static: false }) otherFiles!: ElementRef;
  eflyFileSelected: Boolean = false;
  eflyFileName: String = 'Document.efly';
  eflyFileSize: any = '';
  repeatDiv: number = 0;
  errorMessage: any = '';
  fileNameArr: any[] = [];
  fileDetails: any[] = [];
  incorrectFiles: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  openFileDialog(inputType: string) {
    switch (inputType) {
      case 'efly':
        this.fileInputEfly.nativeElement.click();
        break;
      case 'otherFiles':
        this.otherFiles.nativeElement.click();
        break;
      default:
        console.error('Invalid inputType:', inputType);
    }
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const selectedFile = files[i];
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
          const [_, extension] = selectedFile.name.split('.');

          if (extension === 'efly') {
            const fileContent = JSON.parse(fileReader.result as string);
            this.storeFileName(fileContent);
            this.uploadFile(selectedFile);
          } else {
            this.validateFile(selectedFile);
          }
        };
        fileReader.readAsText(selectedFile);
        if(selectedFile.name.split('.').pop() == "efly"){
          this.eflyFileSize = this.calculateSize(selectedFile.size)
        }else{
          this.fileDetails = [
            ...this.fileDetails,
            {
              size: this.calculateSize(selectedFile.size),
              extension: selectedFile.name.split('.').pop(),
            },
          ];
        }
        
        
        console.log('xxxxxxxx', this.fileDetails);
        this.eflyFileSelected = true;
      }
    }
  }

  uploadFile(selectedFile: File) {
    const formData = new FormData();
    formData.append('file', selectedFile);

    this.http.post('http://localhost:5000/upload', formData).subscribe(
      (response) => {
        console.log('Response:', response);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  validateFile(selectedFile: any) {
    if (this.fileNameArr.includes(selectedFile.name)) {
      this.repeatDiv += 1;
      this.uploadFile(selectedFile);
    } else {
      this.errorMessage = selectedFile.name;
      this.incorrectFiles.push(selectedFile.name);
    }
  }
  storeFileName(fileContent: any) {
    //store the file name globally for name-check

    const flights = fileContent.contents.flights[0].files;

    this.fileNameArr.push(
      flights.log,
      flights.maps_files.find((item: string) => item.endsWith('.las')),
      flights.trajs_files.find((item: string) => item.endsWith('.csv'))
    );
  }
  calculateSize(sizeInBytes: number): string {
    const units = ['Bytes', 'KB', 'MB', 'GB'];
    const exponent = Math.min(Math.floor(Math.log2(sizeInBytes) / 10), units.length - 1);
    const size = (sizeInBytes / Math.pow(1024, exponent)).toFixed(2);
    
    return size + ' ' + units[exponent];
  }
  
}
