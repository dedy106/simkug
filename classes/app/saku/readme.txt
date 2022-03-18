jambooSAKU-v1.
1. migrasi
	-> gl
		-> Konsolidasi
			-> copy Akun ke semua lokasi
	-> kasbank
	-> inventory
	-> koperasi
	
2. open Application
	-> register user
		-> user id and name
		-> user location / company
	-> register location / company by user
	-> login base on user location / company
	-> every table must have location / company

3. cutomize application
	-> table sysprogram
	
4. Koreksian Jurnal
	-> Jika Periode > Periode system
		delete
	-> else periode = periode system
		if (Posted) unposted
		else delete
	-> else reverse

5. BillingK
	-> jika cust / kontrak berubah