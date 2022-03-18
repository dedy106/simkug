/**
 * @author dweexfuad, mr
 
 ------> if agg_abau_kamus.jenis = LOCK then inner else keluarin semua variable 
 
 */
window.app_budget_transaksi_fBpccAbau = function(owner)
{
	if (owner)
	{
		window.app_budget_transaksi_fBpccAbau.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_transaksi_fBpccAbau";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Anggaran Norma Biaya Variable TPKK: Input", 0);
		try{	
			uses("portalui_datePicker;portalui_saiGrid;portalui_sgNavigator");			
			this.lblTgl1 = new portalui_label(this, {bound: [20, 32, 101, 20],caption: "Tanggal",underline: true});						
			this.dp_tgl1 = new portalui_datePicker(this, {bound: [120, 32, 90, 18]});				
	        this.ed_nb = new portalui_saiLabelEdit(this, {bound: [20, 78, 230, 20],caption: "No Bukti",readOnly:true});			
			this.bGen = new portalui_button(this, {bound: [256, 78, 80, 20],caption: "Gen",icon: "url(icon/" + system.getThemes() + "/process.png)"});				
			this.ed_desc = new portalui_saiLabelEdit(this, {bound: [20, 10, 500, 20],caption: "Deskripsi",maxLength: 150});								
			this.ePP = new portalui_saiCBBL(this,{bound:[20,11,200,20],caption:"Bisnis Unit", multiSelection:false,tag:2});	
			this.cJenis = new portalui_saiCB(this,{bound:[20,13,200,20],caption:"Jenis",items:["RECURING","TAMBAHAN"],tag:2});
			this.eTahun = new portalui_saiLabelEdit(this,{bound:[20,12,180,20],caption:"Tahun Anggaran",tipeText:ttAngka,maxLength:4,tag:2});
			
			this.p1 = new portalui_panel(this,{bound: [20, 232, 900, 355],caption: "Daftar Item"});	    				
			this.sg1 = new portalui_saiGrid(this.p1, {bound: [1, 20, 895, 308],colCount: 19,
					colTitle:["Kode Param","Nama Parameter",
							  "Kode Var","Nama Variabel","Kode Akun","Nama Akun","Tarif", 
					          "Kode RKA","Nama RKA","No DRK","Nama DRK","Kode PK","Nama PK",
							  "Kode BU","Bisnis Unit",
							  "Periode","Jumlah","Volume","Total"
					
					],
					colWidth:[[18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],
					         [100,70,70,100, 100,80,  100,80,100,80,100,80, 70,100,80,100,80, 100,80]],
					colFormat:[[6,16,17,18],[cfNilai,cfNilai,cfNilai,cfNilai]],
					buttonStyle:[[0,2,7,13,15],[bsEllips,bsEllips,bsEllips,bsEllips,bsAuto]],
					
					columnReadOnly:[true,[1,3,4,5,6,8,9,10,11,12,14,15,18],[]],
					colHide:[[9,10,11,12],true],
					picklist:[[15],[new portalui_arrayMap({items:["01","02","03","04","05","06","07","08","09","10","11","12","A. 01,04,07,10","B. 01,07","C. 01-12"]})]],
					change:[this,"doChangeCell"],ellipsClick: [this,"doEllipsClick"],defaultRow:1
			});    			
			this.sgNav = new portalui_sgNavigator(this.p1, {bound: [1, 330, 897, 25],grid: this.sg1,border: 0,buttonStyle: 2});		
			this.rearrangeChild(10,23);
			setTipeButton(tbSimpan);
			this.setTabChildIndex(); 

			this.dbLib = new util_dbLib();
		    this.dbLib.addListener(this);
		    this.standarLib = new util_standar();											
			this.dp_tgl1.onSelect.set(this, "doSelect");
			this.bGen.onClick.set(this, "genClick");
			this.sg1.onNilaiChange.set(this, "doNilaiChange");
			this.sg1.onCellExit.set(this, "doCellExit");
			this.sgNav.onPager.set(this, "doSelectedPage");
			this.ed_period= this.dp_tgl1.getYear().toString()+(this.dp_tgl1.getMonth() < 10 ? "0" : "") +this.dp_tgl1.getMonth();
			this.standarLib.clearByTag(this,["0","1"],this.dp_tgl1);				
			this.baris = this.app._baris;
			this.ePP.setSQL("select kode_pp, nama from agg_pp where kode_lokasi = '"+this.app._lokasi+"' ",["kode_pp","nama"],false,["Kode BU","Nama"],"and","Data Bisnis Unit",true);
			this.sg1.clear(1);
			this.eTahun.setText("2010");
			
			
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_budget_transaksi_fBpccAbau.extend(window.portalui_childForm);
window.app_budget_transaksi_fBpccAbau.implement({
	mainButtonClick : function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");		
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");		
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");		
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event)
		{
			case "clear" :
				if (modalResult == mrOk)
				{
					this.standarLib.clearByTag(this, new Array("0","8"),this.dp_tgl1);				
					this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
					this.sg1.clear(1); 
				}
				break;
			case "simpan" :				
				var vTahun = this.eTahun.getText();
				this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_abau_m','no_abau',this.app._lokasi+"-ABAU"+this.dp_tgl1.getThnBln().substr(2,2)+""+(this.dp_tgl1.getMonth()< 10 ?"0":"")+this.dp_tgl1.getMonth()+".",'0000'));
				var sql = new server_util_arrayList();
				sql.add("insert into agg_abau_m(no_abau, kode_lokasi, tanggal, kode_pp, keterangan, jenis, tgl_input, nik_user, progress, tahun)"+
						"                values('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_tgl1.getDateString()+"','"+this.ePP.getText()+"','"+this.ed_desc.getText()+"','"+this.cJenis.getText().substr(0,1)+"',now(), '"+this.app._userLog+"','0','"+this.eTahun.getText()+"') ");
				
				var idx = 0;
				for (var i=0;i< this.sg1.getRowCount();i++){
					if (this.sg1.rowValid(i)){
						if (this.sg1.cells(10,i).substr(0,1) == "A"){
							idx++;
							sql.add("insert into agg_abau_d(no_abau,kode_lokasi,kode_rka,kode_drk,kode_pk,kode_var,kode_akun,kode_pp,bulan,jumlah,volume,periode,nilai,tahun,tarif,no_urut,posted)"+
									" values('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(2,i)+"','"+this.sg1.cells(15,i)+"','"+this.sg1.cells(4,i)+"' "+
									" ,'"+this.sg1.cells(6,i)+"','"+this.sg1.cells(8,i)+"','01',"+parseNilai(this.sg1.cells(11,i))+","+parseNilai(this.sg1.cells(12,i))+",'"+vTahun+"01"+"',"+parseNilai(this.sg1.cells(14,i))+",'"+vTahun+"',"+parseNilai(this.sg1.cells(13,i))+","+idx+",'F')");
							idx++;
							sql.add("insert into agg_abau_d(no_abau,kode_lokasi,kode_rka,kode_drk,kode_pk,kode_var,kode_akun,kode_pp,bulan,jumlah,volume,periode,nilai,tahun,tarif,no_urut,posted)"+
									" values('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(2,i)+"','"+this.sg1.cells(15,i)+"','"+this.sg1.cells(4,i)+"' "+
									" ,'"+this.sg1.cells(6,i)+"','"+this.sg1.cells(8,i)+"','04',"+parseNilai(this.sg1.cells(11,i))+","+parseNilai(this.sg1.cells(12,i))+",'"+vTahun+"04"+"',"+parseNilai(this.sg1.cells(14,i))+",'"+vTahun+"',"+parseNilai(this.sg1.cells(13,i))+","+idx+",'F')");
							idx++;
							sql.add("insert into agg_abau_d(no_abau,kode_lokasi,kode_rka,kode_drk,kode_pk,kode_var,kode_akun,kode_pp,bulan,jumlah,volume,periode,nilai,tahun,tarif,no_urut,posted)"+
									" values('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(2,i)+"','"+this.sg1.cells(15,i)+"','"+this.sg1.cells(4,i)+"' "+
									" ,'"+this.sg1.cells(6,i)+"','"+this.sg1.cells(8,i)+"','07',"+parseNilai(this.sg1.cells(11,i))+","+parseNilai(this.sg1.cells(12,i))+",'"+vTahun+"07"+"',"+parseNilai(this.sg1.cells(14,i))+",'"+vTahun+"',"+parseNilai(this.sg1.cells(13,i))+","+idx+",'F')");
							idx++;
							sql.add("insert into agg_abau_d(no_abau,kode_lokasi,kode_rka,kode_drk,kode_pk,kode_var,kode_akun,kode_pp,bulan,jumlah,volume,periode,nilai,tahun,tarif,no_urut,posted)"+
									" values('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(2,i)+"','"+this.sg1.cells(15,i)+"','"+this.sg1.cells(4,i)+"' "+
									" ,'"+this.sg1.cells(6,i)+"','"+this.sg1.cells(8,i)+"','10',"+parseNilai(this.sg1.cells(11,i))+","+parseNilai(this.sg1.cells(12,i))+",'"+vTahun+"10"+"',"+parseNilai(this.sg1.cells(14,i))+",'"+vTahun+"',"+parseNilai(this.sg1.cells(13,i))+","+idx+",'F')");
						} 
						else {
							if (this.sg1.cells(10,i).substr(0,1) == "B"){
								idx++;
								sql.add("insert into agg_abau_d(no_abau,kode_lokasi,kode_rka,kode_drk,kode_pk,kode_var,kode_akun,kode_pp,bulan,jumlah,volume,periode,nilai,tahun,tarif,no_urut,posted)"+
										" values('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(2,i)+"','"+this.sg1.cells(15,i)+"','"+this.sg1.cells(4,i)+"' "+
										" ,'"+this.sg1.cells(6,i)+"','"+this.sg1.cells(8,i)+"','01',"+parseNilai(this.sg1.cells(11,i))+","+parseNilai(this.sg1.cells(12,i))+",'"+vTahun+"01"+"',"+parseNilai(this.sg1.cells(14,i))+",'"+vTahun+"',"+parseNilai(this.sg1.cells(13,i))+","+idx+",'F')");
								idx++;
								sql.add("insert into agg_abau_d(no_abau,kode_lokasi,kode_rka,kode_drk,kode_pk,kode_var,kode_akun,kode_pp,bulan,jumlah,volume,periode,nilai,tahun,tarif,no_urut,posted)"+
										" values('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(2,i)+"','"+this.sg1.cells(15,i)+"','"+this.sg1.cells(4,i)+"' "+
										" ,'"+this.sg1.cells(6,i)+"','"+this.sg1.cells(8,i)+"','07',"+parseNilai(this.sg1.cells(11,i))+","+parseNilai(this.sg1.cells(12,i))+",'"+vTahun+"04"+"',"+parseNilai(this.sg1.cells(14,i))+",'"+vTahun+"',"+parseNilai(this.sg1.cells(13,i))+","+idx+",'F')");
							}
							else {
								if (this.sg1.cells(10,i).substr(0,1) == "C"){
									for (var j=1; j <= 12; j++){
										idx++;
										sql.add("insert into agg_abau_d(no_abau,kode_lokasi,kode_rka,kode_drk,kode_pk,kode_var,kode_akun,kode_pp,bulan,jumlah,volume,periode,nilai,tahun,tarif,no_urut,posted)"+
												" values('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(2,i)+"','"+this.sg1.cells(15,i)+"','"+this.sg1.cells(4,i)+"' "+
												" ,'"+this.sg1.cells(6,i)+"','"+this.sg1.cells(8,i)+"','"+(j<10?"0":"")+j+"',"+parseNilai(this.sg1.cells(11,i))+","+parseNilai(this.sg1.cells(12,i))+",'"+vTahun+(j<10?"0":"")+j+"',"+parseNilai(this.sg1.cells(14,i))+",'"+vTahun+"',"+parseNilai(this.sg1.cells(13,i))+","+idx+",'F')");
									}
								}
								else {
									idx++;
									sql.add("insert into agg_abau_d(no_abau,kode_lokasi,kode_rka,kode_drk,kode_pk,kode_var,kode_akun,kode_pp,bulan,jumlah,volume,periode,nilai,tahun,tarif,no_urut,posted)"+
											" values('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(2,i)+"','"+this.sg1.cells(15,i)+"','"+this.sg1.cells(4,i)+"' "+
											" ,'"+this.sg1.cells(6,i)+"','"+this.sg1.cells(8,i)+"','"+this.sg1.cells(10,i)+"',"+parseNilai(this.sg1.cells(11,i))+","+parseNilai(this.sg1.cells(12,i))+",'"+vTahun+this.sg1.cells(10,i)+"',"+parseNilai(this.sg1.cells(14,i))+",'"+vTahun+"',"+parseNilai(this.sg1.cells(13,i))+","+idx+",'F')");
								}
							}
						}
					}
				}				
				this.dbLib.execArraySQL(sql);
				break;
			case "simpancek" : this.simpan();
				break;
		}
	},
	pAllClick: function(sender){		
	},
	doCariClick: function(sender){
		for (var i=0; i < this.sg1.rows.getLength(); i++){
			if (this.sg1.cells(2,i) == this.ed_cari.getText()) {
				this.sg1.goToRow(i);
				break;
			}
		}
	},
	genClick: function(sender){
		try
		{
			if (this.ed_period != "") {
				this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_abau_m','no_abau',this.app._lokasi+"-ABAU"+this.dp_tgl1.getThnBln().substr(2,2)+""+(this.dp_tgl1.getMonth()< 10 ?"0":"")+this.dp_tgl1.getMonth()+".",'0000'));
				this.ed_desc.setFocus();
			}
		}
		catch (e)
		{
			alert(e);
		}
	},
	doSelect: function(sender, year, month, day){
		if (month < 10)
			month = "0"+month;
		this.ed_period= year.toString()+month;
	},
	doNilaiChange: function(){		
		for (var i = 0;i < this.sg1.getRowCount();i++){
			if (this.sg1.cells(11,i) != "" && this.sg1.cells(12,i) != "" && this.sg1.cells(13,i) != "") {
				this.sg1.setCell(14,i,floatToNilai(nilaiToFloat(this.sg1.cells(11,i)) * nilaiToFloat(this.sg1.cells(12,i)) * nilaiToFloat(this.sg1.cells(13,i))));
			}
		}	
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib)
		{
			try
			{   
				switch(methodName)
	    		{
	    			case "execArraySQL" :	    				
					if (result.toLowerCase().search("error") == -1)					
					{						
						this.app._mainForm.pesan(2,"Transaksi sukses tersimpan dengan no bukti :("+ this.ed_nb.getText()+")");						
						this.app._mainForm.bClear.click();              						
					}else system.info(this,result,"");
	    			break;	      			
					case "listData" :
						this.sg1.clear(1); 
					break;
	    		}
			}
			catch(e)
			{
				alert(e);
			}
	    }
	},
	/*
	doChangeCell: function(sender, col, row){
		switch (col) {
			case 6:
				this.sg1.setCell(13, row, this.sg1.dataFromList[2]);
				break;
			case 11:
			case 12:
			case 13:
				this.sg1.validasi();
				break;
			case 0:
				var sql = new server_util_arrayList();
				this.jenisRKA = sender.dataFromList[2];
				sql.add("select a.kode_drk,a.nama,a.kode_pk from agg_drk a inner join agg_rka b on a.kode_drk=b.kode_drk and a.kode_lokasi=b.kode_lokasi and a.tahun=b.tahun "+
						"where a.kode_lokasi = '" +this.app._lokasi +"' and a.tahun = '" +this.eTahun.getText() +"' and b.kode_rka = '" +this.sg1.cells(0, row) +"'");
				
				sql.add("select a.kode_var,a.nama from agg_var a inner join agg_norma_var b on a.kode_var=b.kode_var and a.kode_lokasi=b.kode_lokasi "+
						"	                                     inner join agg_abau_kamus c on c.kode_var = a.kode_var and c.kode_lokasi = a.kode_lokasi and c.tahun = b.tahun "+
					    "where a.kode_lokasi = '" +this.app._lokasi +"' and b.tahun = '" +this.eTahun.getText() +"' and c.kode_rka = '" +this.sg1.cells(0, this.sg1.row) +"' ");
				
				sql.add("select a.kode_akun,a.nama,tarif, b.kode_var from agg_masakun a inner join agg_norma_var b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi " +
				        "	                                     inner join agg_abau_kamus c on c.kode_var = b.kode_var and c.kode_lokasi = a.kode_lokasi and c.tahun = b.tahun " +
						"where c.kode_rka = '" +this.sg1.cells(0, this.sg1.row) +"' and a.kode_lokasi = '" +this.app._lokasi +"' and b.tahun = '" +this.eTahun.getText() +"'");
				
				var data = this.dbLib.getMultiDataProvider(sql,true);				
				if (typeof data != "string") {					
					if (data.result[0].rs.rows[0] != undefined) {
						var line = data.result[0].rs.rows[0];
						this.sg1.cells(2,row, line.kode_drk);
						this.sg1.cells(3,row, line.nama);
						this.sg1.cells(15,row, line.kode_pk);
					}
					if (data.result[1].rs.rows[0] != undefined) {
						var line = data.result[1].rs.rows[0];
						this.sg1.cells(4, row,line.kode_var);
						this.sg1.cells(5, row,line.nama);
					}
					if (data.result[2].rs.rows[0] != undefined) {
						var line = data.result[2].rs.rows[0];
						this.sg1.cells(6, row,line.kode_akun);
						this.sg1.cells(7, row,line.nama);
						this.sg1.cells(13, row, floatToNilai(line.tarif));
					}
				}
				break;
		}		
	},
	doEllipsClick: function(sender, col, row) {
		try
		{
			switch(col){
				case 0 : 
					this.standarLib.showListDataForSG(this, "Daftar Parameter Layanan",this.sg1, this.sg1.row, this.sg1.col, 													  
													  "select kode_param,nama   from agg_bpcc_param where kode_lokasi='"+this.app._lokasi+"' and tahun = '"+this.eTahun.getText()+"'",
													  "select count(kode_param) from agg_bpcc_param where kode_lokasi='"+this.app._lokasi+"' and tahun = '"+this.eTahun.getText()+"'",
													  new Array("kode_param","nama"),"and",new Array("Kode","Nama"),false);
					break;
				case 2 : 
					this.standarLib.showListDataForSG(this, "Daftar Variable Biaya",this.sg1, this.sg1.row, this.sg1.col, 
														  "select a.kode_var,a.nama from agg_var a inner join agg_norma_var b on a.kode_var=b.kode_var and a.kode_lokasi=b.kode_lokasi "+
														  "where a.kode_lokasi = '"+this.app._lokasi+"' and b.tahun = '"+this.eTahun.getText()+"' ",
														  "select count(a.kode_var) from agg_var a inner join agg_norma_var b on a.kode_var=b.kode_var and a.kode_lokasi=b.kode_lokasi "+
														  "where a.kode_lokasi = '"+this.app._lokasi+"' and b.tahun = '"+this.eTahun.getText()+"' ",
														  new Array("a.kode_var","a.nama"),"and",new Array("Kode","Nama"),false);					
					}
					break;
				case 2 : 
					this.standarLib.showListDataForSG(this, "Daftar DRK",this.sg1, this.sg1.row, this.sg1.col, 													  
													  "select a.kode_drk,a.nama from agg_drk a inner join agg_rka b on a.kode_drk=b.kode_drk and a.kode_lokasi=b.kode_lokasi and a.tahun=b.tahun "+
													  "where a.kode_lokasi = '"+this.app._lokasi+"' and a.tahun = '"+this.eTahun.getText()+"' and b.kode_rka = '"+this.sg1.cells(0,this.sg1.row)+"'",
													  "select count(a.kode_drk) from agg_drk a inner join agg_rka b on a.kode_drk=b.kode_drk and a.kode_lokasi=b.kode_lokasi and a.tahun=b.tahun "+
													  "where a.kode_lokasi = '"+this.app._lokasi+"' and a.tahun = '"+this.eTahun.getText()+"' and b.kode_rka = '"+this.sg1.cells(0,this.sg1.row)+"'",
													  new Array("a.kode_drk","a.nama"),"and",new Array("Kode DRK","Nama"),false);
					break;
				case 0 : 
					this.standarLib.showListDataForSG(this, "Daftar RKA",this.sg1, this.sg1.row, this.sg1.col, 													  
													  "select a.kode_rka,a.nama, ifnull(d.jenis,'-') as jenis from agg_rka a inner join agg_drk b on a.kode_drk=b.kode_drk and a.kode_lokasi=b.kode_lokasi and a.tahun=b.tahun "+
													  "                                     inner join agg_pk c on b.kode_pk=c.kode_pk and b.kode_lokasi=c.kode_lokasi and c.tahun=b.tahun "+
													  "										left outer join agg_abau_kamus d on d.kode_rka = a.kode_rka and d.tahun = a.tahun and d.kode_lokasi = a.kode_lokasi "+
													  "where a.kode_lokasi = '"+this.app._lokasi+"' and a.tahun = '"+this.eTahun.getText()+"' ",
													  "select count(a.kode_rka) from agg_rka a inner join agg_drk b on a.kode_drk=b.kode_drk and a.kode_lokasi=b.kode_lokasi and a.tahun=b.tahun "+
													  "                                        inner join agg_pk c on b.kode_pk=c.kode_pk and b.kode_lokasi=c.kode_lokasi and c.tahun=b.tahun "+
													  "where a.kode_lokasi = '"+this.app._lokasi+"' and a.tahun = '"+this.eTahun.getText()+"' ",
													  new Array("a.kode_rka","a.nama","ifnull(d.jenis,'-')"),"and",new Array("Kode RKA","Nama",'Jenis'),false);
					break;
				case 6 : 
					this.standarLib.showListDataForSG(this, "Daftar Akun",this.sg1, this.sg1.row, this.sg1.col, 
													  "select a.kode_akun,a.nama,tarif from agg_masakun a inner join agg_norma_var b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
													  "where b.kode_var = '"+this.sg1.cells(4,this.sg1.row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' and b.tahun = '"+this.eTahun.getText()+"'",
													  "select count(a.kode_akun) from agg_masakun a inner join agg_norma_var b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
													  "where b.kode_var = '"+this.sg1.cells(4,this.sg1.row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' and b.tahun = '"+this.eTahun.getText()+"'",
													  new Array("a.kode_akun","a.nama","b.tarif"),"and",new Array("Kode","Nama","Tarif"),false);
					break;
				case 8 : 
					this.standarLib.showListDataForSG(this, "Daftar Bisnis Unit",this.sg1, this.sg1.row, this.sg1.col, 
													  "select kode_pp,nama   from agg_pp where kode_lokasi='"+this.app._lokasi+"' and tipe='posting'",
													  "select count(kode_pp) from agg_pp where kode_lokasi='"+this.app._lokasi+"' and tipe='posting'",
													  new Array("kode_pp","nama"),"and",new Array("Kode","Nama"),false);
					break;
			}
		}catch(e)
		{
			systemAPI.alert("[app_saku_gl_transaksi_fJu2] : doFindBtnClick : " + e);
		}
	}
	*/
});
