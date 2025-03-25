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
  @Input() isLog = false;
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
  selectedTask = "";

  tablice: { 
    nazwa:string,
    user:string 
  }[] = [];
  zadania: {
    tytul:string,
    opis:string,
    stan_zrobienia:boolean,
    tablica:string,
    user:string
  }[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getTables().subscribe(data => {
      this.tablice  = data?.filter((tablica: { nazwa: string; user: string }) => tablica.user === this.login);
      
    });

    this.userService.getTasks().subscribe(data =>{
      this.zadania = data?.filter((zadanie: { user: string; }) => zadanie.user === this.login);
    });

  }

  openTable(){//* otwiera okno z tablicami
    this.isTableWindowOpen = true;
    document.getElementById("tableAppIcon")?.style.setProperty("border", "5px solid green");
    this.closeEditTask();
    this.closeAddTask();
    //alert(this.login)
  }

  getFilteredTasks() {//* filtruje zdania po tablicy=
    return this.zadania.filter(zadanie => zadanie.tablica === this.selectedTable);
  }

  openTableInfo(nam: string){//* otwiera tablice i ustawia wartość
    if(nam == ""){
      this.selectedTable = "";
    }
    else{
      const tablica = this.tablice?.find(item => item.nazwa === nam && item.user === this.login);
      if (tablica) {
        this.selectedTable = tablica.nazwa;
      }
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
    const zadanie = this.zadania.find(zadanie => zadanie.tytul === nazwa && zadanie.tablica === this.selectedTable);
    if (zadanie) {
      // alert(`Edytuje zadanie o id: ${id} i tytule: ${zadanie.tytul}, opisie: ${zadanie.opis}`);
      this.isEditTaskOpen = true;
      document.getElementById("tableAppIcon")?.style.setProperty("border", "5px solid yellow");
      this.task_tytul = zadanie.tytul;
      this.task_opis = zadanie.opis;
      this.task_tablica = zadanie.tablica;
      this.selectedTask = zadanie.tytul;
    } else {
      alert(`Nie znaleziono zadania o id: ${nazwa}`);
    }
  }

  deleteTask(nazw: string){//* usuwanie zadania
    const index = this.zadania.findIndex(zadanie => zadanie.tytul === nazw && zadanie.tablica === this.selectedTable);
    if (index !== -1) {
      //połączenie

      this.userService.deleteTask({tytul:nazw, tablica:this.selectedTable}).subscribe();
      this.zadania.splice(index, 1);
    } else {
      alert(`Nie znaleziono zadania o id: ${nazw}`);
    }
  }
  realizeTask(nazw: string){//* realizacja zadania  
    const zadanie = this.zadania.find(zadanie => zadanie.tytul === nazw && zadanie.tablica === this.selectedTable);
    if (zadanie) {
      //połączenie
      zadanie.stan_zrobienia = true;
      this.userService.updateTask({
        tytul: zadanie.tytul,
        opis: zadanie.opis,
        stan_zrobienia: zadanie.stan_zrobienia,
        tablica: zadanie.tablica,
        user: zadanie.user
      }).subscribe();
    }
  }
  saveTask(){//* zapisuje edytowane zadanie
    const zadanie = this.zadania.find(zadanie => zadanie.tytul === this.selectedTask && zadanie.tablica === this.task_tablica);
    if (zadanie) {
      zadanie.tytul = this.task_tytul;
      zadanie.opis = this.task_opis;
      zadanie.tablica = this.task_tablica;
      zadanie.user = this.login;
      //połączenie
      this.userService.updateTask({
        tytul: zadanie.tytul,
        opis: zadanie.opis,
        stan_zrobienia: zadanie.stan_zrobienia,
        tablica: zadanie.tablica,
        user: zadanie.user
      }).subscribe();
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
    if(this.task_tytul.length < 1 || this.task_opis.length < 1 || this.task_tablica == ""){
      alert("Wypełnij wszystkie pola");
    }
    else{
      const task = this.zadania.find(task => task.tytul === this.task_tytul && task.tablica === this.task_tablica && task.user === this.login);
      if (task) {
        alert(`Zadanie o tytule: ${this.task_tytul} już istnieje`);
      }
      else{
        //const id = this.zadania.length + 1;
        const task:any = {
          tytul: this.task_tytul, 
          opis: this.task_opis, 
          stan_zrobienia: false,
          tablica: this.task_tablica, 
          user: this.login
        }
        this.zadania.push(task);
        //połączenie
        this.userService.addTask(task).subscribe();
        this.closeAddTask();
        this.cleanVariablesOfTask();
      }
    }
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
    if( this.table_name.length < 1){
      alert("Wypełnij pole");
    }
    else{

      const tablica = this.tablice.find(tablica => tablica.nazwa === this.table_name);
      if (tablica) {
        alert(`Tablica o nazwie: ${this.table_name} już istnieje`);
      }
      else{
        const id = this.tablice.length + 1;
        this.tablice.push({nazwa: this.table_name, user: this.login});
        this.userService.addTable({nazwa: this.table_name, user: this.login}).subscribe();
        this.closeAddTable();
      }
    }

  }

  deleteTable(nazw: string){//* usuwanie tablicy
    const index = this.tablice.findIndex(tablica => tablica.nazwa === nazw);
    if (index !== -1) {
      this.tablice.splice(index, 1);
      for(var x of this.zadania){
        if(x.tablica == nazw){
          this.deleteTask(x.tytul);
        }
      }
      this.userService.deleteTable({nazwa: nazw, user: this.login}).subscribe();
      
      
      
    }
  }

  askToDeleteTable(nazw: string){//* pytanie o usunięcie tablicy
      const tablica = this.tablice.find(tablica => tablica.nazwa === nazw);
      if (tablica) { 
        if(confirm(`Czy na pewno chcesz usunąć tablice o nazwie: ${tablica.nazwa}`)){
          this.deleteTable(nazw);
          this.openTableInfo("");
        }
      }
    }
}
