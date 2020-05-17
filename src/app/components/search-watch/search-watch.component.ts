
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { Montre } from 'src/app/models/montre';
import { MontreService } from 'src/app/services/watch.service';

@Component({
  selector: 'app-search-watch',
  templateUrl: './search-watch.component.html',
  styleUrls: ['./search-watch.component.css']
})
export class SearchWatchComponent implements OnInit {

	private searchTerms = new Subject<string>();
	montres: Observable<Montre[]>;
	/* age: number;
	lunette: string; */

	constructor(
		private montresService: MontreService,
		private router: Router) { }

	

	ngOnInit(): void {
		/* this.age = 45;
		this.lunette = "rouge"; */
		this.montres = this.searchTerms.pipe(
			// attendre 300ms de pause entre chaque requête
			debounceTime(300),
			// ignorer la recherche en cours si c'est la même que la précédente
			distinctUntilChanged(),
			// on retourne la liste des résultats correpsondant aux termes de la recherche
			switchMap((term: string) => this.montresService.searchMontre(term)),
		);
	}

	gotoDetail(montre: Montre): void {
		let link = ['/montres', montre._id];
		this.router.navigate(link);
	}

	// Ajoute un terme de recherche dans le flux de l'Observable 'searchTerms'
	search(term: string): void {
		this.searchTerms.next(term);
		console.log("My mark is ",term);
		
	}

/* 	getColor(lunette) { (2)
		switch (lunette) {
		  case 'verte':
			return 'green';
		  case 'bleu':
			return 'blue';
		  case 'rouge':
			return 'red';
		}
	  } */
}