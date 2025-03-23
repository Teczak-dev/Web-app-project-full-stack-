import { Component, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { NgFor } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dock',
  imports: [
    NgIf, 
    NgFor,
    FormsModule],
  templateUrl: './dock.component.html',
  styleUrl: './dock.component.css'
})
export class DockComponent {

  @Input() login: string = "";


  task_tytul:string = "";
  task_opis:string = "";
  task_tablica:string = "";
  table_name:string = "";


  selectedTable = "";
  isTableWindowOpen = false;
  isEditTaskOpen = false;
  isAddTaskOpen = false;
  isAddTableOpen = false;
  selectedTask = -1;

  tablice: { nazwa:string,user:string }[] = [];
  zadania = [
    {tytul: 'Zadanie 1',opis: "trzeba zrobić zadanie nr1", tablica:"Zadania", zrealizowane: false, id: 1},
  ];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getTables().subscribe(data => {
      var tablice_usera = data?.filter((tablica: { nazwa: string; user: string }) => tablica.user === this.login);
      this.tablice = tablice_usera;
    });
  }

  openTable(){//* otwiera okno z tablicami
    this.isTableWindowOpen = true;
    document.getElementById("tableAppIcon")?.style.setProperty("border", "5px solid green");
    this.closeEditTask();
    this.closeAddTask();
    alert(this.login)
  }

  getFilteredTasks() {//* filtruje zdania po tablicy
    return this.zadania.filter(zadanie => zadanie.tablica === this.selectedTable);
  }

  openTableInfo(nam: string){//* otwiera tablice i ustawia wartość
    const tablica = this.tablice?.find(item => item.nazwa === nam);
    if (tablica) {
      //alert(`Otwieram tablice o id: ${id} i nazwie: ${tablica.name}`);
      this.selectedTable = tablica.nazwa;

    } else {
      alert(`Nie znaleziono tablicy o nazwie: ${nam}`);
    }
  }

  closeTable(){//* zamyka okno z tablicami
    this.isTableWindowOpen = false;
    document.getElementById("tableAppIcon")?.style.setProperty("border", "none");
    this.selectedTable = "";
  }
  closeEditTask(){//* zamyka okno edycji zadania
    this.isEditTaskOpen = false;
    if(this.isTableWindowOpen)
      document.getElementById("tableAppIcon")?.style.setProperty("border", "5px solid green");
      
    this.cleanVariablesOfTask();
  }

  editTask(nazwa: string){//* edycja zadania( otwarcie okna edycji)
    const zadanie = this.zadania.find(zadanie => zadanie.tytul === nazwa);
    if (zadanie) {
      // alert(`Edytuje zadanie o id: ${id} i tytule: ${zadanie.tytul}, opisie: ${zadanie.opis}`);
      this.isEditTaskOpen = true;
      document.getElementById("tableAppIcon")?.style.setProperty("border", "5px solid yellow");
      this.task_tytul = zadanie.tytul;
      this.task_opis = zadanie.opis;
      this.task_tablica = zadanie.tablica;
      this.selectedTask = zadanie.id;
    } else {
      alert(`Nie znaleziono zadania o id: ${nazwa}`);
    }
  }

  deleteTask(nazw: string){//* usuwanie zadania
    const index = this.zadania.findIndex(zadanie => zadanie.tytul === nazw);
    if (index !== -1) {
      this.zadania.splice(index, 1);
    } else {
      alert(`Nie znaleziono zadania o id: ${nazw}`);
    }
  }
  realizeTask(nazw: string){//* realizacja zadania  
    const zadanie = this.zadania.find(zadanie => zadanie.tytul === nazw);
    if (zadanie) {
      zadanie.zrealizowane = true;
    } else {
      alert(`Nie znaleziono zadania o id: ${nazw}`);
    }
  }
  saveTask(){//* zapisuje edytowane zadanie
    const zadanie = this.zadania.find(zadanie => zadanie.id === this.selectedTask);
    if (zadanie) {
      zadanie.tytul = this.task_tytul;
      zadanie.opis = this.task_opis;
      zadanie.tablica = this.task_tablica;
      this.closeEditTask();
      this.cleanVariablesOfTask();
    } else {
      alert(`Nie znaleziono zadania o id: ${this.selectedTask}`);
    }
  }

  closeAddTask(){//* zamyka okno dodawania zadania
    this.isAddTaskOpen = false;
    if(this.isTableWindowOpen)
      document.getElementById("tableAppIcon")?.style.setProperty("border", "5px solid green");
      
    this.cleanVariablesOfTask();
  }
  openAddTask(){//* otwiera okno dodawania zadania
    this.isAddTaskOpen = true;
    document.getElementById("tableAppIcon")?.style.setProperty("border", "5px solid yellow");
    
  }
  addTask(){//* dodawanie zadania
    const id = this.zadania.length + 1;
    this.zadania.push({tytul: this.task_tytul, opis: this.task_opis, tablica: this.task_tablica, zrealizowane: false, id});
    this.closeAddTask();
    this.cleanVariablesOfTask();
  }


  cleanVariablesOfTask(){//* czyszczenie zmiennych związanych z zadaniem
    this.task_tytul = "";
    this.task_opis = "";
    this.task_tablica = "";
  }

  openAddTable(){//* otwiera okno dodawania tablicy
    this.isAddTableOpen = true;
    document.getElementById("tableAppIcon")?.style.setProperty("border", "5px solid yellow");
  }

  closeAddTable(){//* zamyka okno dodawania tablicy
    this.isAddTableOpen = false;
    if(this.isTableWindowOpen)
      document.getElementById("tableAppIcon")?.style.setProperty("border", "5px solid green");
    this.table_name = "";
  }

  addTable(){//* dodawanie tablicy
    const id = this.tablice.length + 1;
    this.tablice.push({nazwa: this.table_name, user: this.login});
    this.userService.addTable({nazwa: this.table_name, user: this.login}).subscribe();
    this.closeAddTable();

  }

  deleteTable(nazw: string){//* usuwanie tablicy
    const index = this.tablice.findIndex(tablica => tablica.nazwa === nazw);
    if (index !== -1) {
      this.userService.deleteTable({nazwa: nazw}).subscribe();
      this.tablice.splice(index, 1);
    } else {
      alert(`Nie znaleziono tablicy o id: ${nazw}`);
    }
  }

  askToDeleteTable(nazw: string){//* pytanie o usunięcie tablicy
      const tablica = this.tablice.find(tablica => tablica.nazwa === nazw);
      if (tablica) { 
        if(confirm(`Czy na pewno chcesz usunąć tablice o nazwie: ${tablica.nazwa}`)){
          this.deleteTable(nazw);
        }
      }
    }
}
