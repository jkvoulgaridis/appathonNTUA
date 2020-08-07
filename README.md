# appathonNTUA@gr

Στην παρούσα εργασία θα φτιαχτεί μια Desktop εφαρμογή η οποία θα εντοπίζει όλα τα κριτήρια καταλληλότητας που έχουν οριστεί για όλες τις κλινικές μελέτες και θα τα καταχωρέι σε μια βάση δεδομένων. Για τις ανάγκες τις εφαρμογής αυτής θα χρειαστεί να κατεβάσετε όλες τις διαθέσιμες κλινικές δοκιμές (XML αρχεία) από το https://clinicaltrials.gov/. 

Οι τεχνολογίες που θα χρησιμοποιηθούν είναι MySQL για την βάση δεδομένων και NodeJS για το Api και OclifCLI για την Desktop εφαρμογή χωρίς γραφικό περιβάλλον(cli). Το NodeJs και το oclif είναι frameworks βασισμένα στην Javascript και την Typescript (γενίκευση της JS).

Η Δομή της εφαρμογής έχει ως εξής: Η Desktop CLI εφαρμογή παίρνει ως παράμετρο τα αρχεία που πρέπει να φορτωθούν ως path από το τοπικό σύστημα αρχείων του υπολογιστή, τα διαβάζει, και στέλνει μέσω post request στο Api τί πρέπει να καταχωρηθεί στη βάση, επιστρέφοντας στην εφαρμογή μύνημα επιτυχούς καταχώρησης (200) ή μύνημα λάθους (400). Η παραπάνω διαδικασία επαναλαμβάνεται για όλα τα αρχεία. 

## Εγκατάσταση της Εφαρμογής

Η  ανάπτυξη της εργασίας έγινε σε Ubuntu 20.04 και οι παρακάτω οδηγίες εγκατάστασης αφορούν Ubuntu 20.04.
1) Αρχικά πρέπει να εγκατασταθεί η βιβλιοθήκη του project με την εντολή: 
			`git clone <url_to_project>`. 
   Στην συνέχεια, γίνεται μετάβαση στην βιβλιοθήκη:
   			`cd <path_to_project>`
2) Εγκατάσταση του NodeJS και του npm : 
			`sudo apt update`
			`sudo apt install nodejs`
			`sudo apt install npm`
   Ελέγχος για σωστή εγκατάσταση :	
   			`node --version`
   			`npm --version`

   Για απεγκατάσταση του npm, nodejs : 
   			`sudo apt remove nodejs npm`

3) Εκκαθάριση της Βάσης:
			 `source criteria_db.sql`

4) Εκκίνηση του Server :
			`node server.js`
			
5) Εκκίνηση της εφαρμογής:
			`.clinic_studies/bin/run filldb --baseDIR <path_to_ALLXML>`

Η παράμετρος baseDIR πρέπει να είναι μονοπάτι του συστήματος αρχείων που να δείχνει σε φάκελο με υποφακέλους οι οποίοι περιέχουν .xml αρχεία τα οποία έχουν συνταξη τέτοια όπως και το αρχικό dataset.
   			 
### Παράδειγμα 
Αν ο φάκελος της εργασίας εγκατασταθεί στο Desktop του χρήστη user ως AppathonNtua τότε το βήμα 1 θα είναι:
			`cd /home/user/Desktop/AppathonNtua`
			
Έχοντας εκτελέσει τα βήματα 1-5 και θέλοντας να φορτώσουμε στην βάση πληροφορία από τον φάκελο AllPublicXML που βρίσkεται στον φάκελο της εργασίας η σύνταξη είναι:

			`./clinic_studies/bin/run filldb --baseDIR /home/user/Desktop/AppathonNtua/AllPublicXML`

# AppathonNTUA@en

The purpose of this project is to build a Desktop app which will extract all the eligibility criteria from clinic studies' report and store them in a relational database. The dataset used is can be downloaded from https://clinicaltrials.gov/ but is also available inside the project folder.

The tools used for this app is MySQL for database development, NodeJs framework (javascript based) for api (server side progeamming) and OclifCLI an open source typescript based framework for CLI app (no garphics).

The work flow of the application is very simple: The CLI accepts as a parameter a local filesystem path containing a folder whose subfolders contain .xml data of medical studies reports from the dataset mentioned above. The CLI parses these .xml files, stores the eligibility criteria and via post requests sends them to the running server. The server (api) executes queries to insert criteria to the Database and returns a code whose value is either 200 (success) or 400 (status error). This procedure runs for every .xml  in the scope of the CLI's argument.

## Setting up the Project

This project was developed and tested on Ubuntu 20.04 and the instalation instructions refer to this OS as well.
1) Download the project folder: 

		`git clone <url_to_project>`.
		 
   Next change directory to the one above: 
   
   		`cd <path_to_project>`
   		
2) Install NodeJs and npm:


		`sudo apt update`
		`sudo apt install nodejs`
		`sudo apt install npm`
		
   Check for corrent instalation: 
   
   		`node --version`
   		`npm --version`
		 
3) build and reset the Database: 

		  `source criteria_db.sql`
		  
4) Start the server:

		  `node server.js`
		  
5) Run the application:

		  `.clinic_studies/bin/run filldb --baseDIR <path_to_ALLXML>`
		  
	Quick Reminder: --baseDIR parameter is a folder whose subfolders contain .xml files. 
	

		

    					
