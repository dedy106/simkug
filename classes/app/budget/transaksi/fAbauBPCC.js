/**
 * @author dweexfuad, mr
 
 ------> if agg_abau_kamus.jenis = LOCK then inner else keluarin semua variable 
 
 */
window.app_budget_transaksi_fAbauBPCC = function(owner)
{
	if (owner)
	{
		window.app_budget_transaksi_fAbauBPCC.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_transaksi_fAbauBPCC";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Anggaran Biaya Variable TPK: Input", 0);
		try{	
			uses("portalui_datePicker;portalui_saiGrid;portalui_sgNavigator");			
			this.eTahun = new portalui_saiLabelEdit(this,{bound:[20,12,180,20],caption:"Tahun Anggaran",tipeText:ttAngka,maxLength:4,tag:2,change:[this,"doChange"]});
	        this.ed_nb = new portalui_saiLabelEdit(this, {bound: [20, 78, 230, 20],caption: "No Bukti",readOnly:true});			
			this.bGen = new portalui_button(this, {bound: [256, 78, 80, 20],caption: "Gen",icon: "url(icon/" + system.getThemes() + "/process.png)"});				
			this.ePP = new portalui_saiCBBL(this,{bound:[20,11,200,20],caption:"PP", multiSelection:false,tag:2});	
			
			//this.bCopy = new portalui_button(this, {bound: [830, 13, 80, 20],caption: "Copy Baris"});				
			
			this.p1 = new portalui_panel(this,{bound: [20, 232, 900, 355],caption: "Daftar Item"});	    				
			this.sg1 = new portalui_saiGrid(this.p1, {bound: [1, 20, 895, 308],colCount: 18,
					colTitle:[
							  "Kode PK","Nama PK","Kode Param","Nama Parameter","Kode RKA","Nama RKA",  
							  "Kode Var","Nama Variabel","Kode Akun","Nama Akun","Tarif",
							  "Deskripsi",
							  "Kode PP","Nama PP",
							  "Jns Periode","Jml Pelaksanaan","Vol Kunjungan","Total"],
					colWidth:[[17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],
					         [100,100,100,100,  100,60,  200,  70,150,80,150,70   ,150,80,150,80,150,80]],
					colFormat:[[10,15,16,17],[cfNilai,cfNilai,cfNilai,cfNilai]],
					colHide: [[0,1],true],
					buttonStyle:[[4,6,12,14],[bsEllips,bsEllips,bsEllips,bsAuto]],
					columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9,10, 12,13,14,17],[11,15,16]],
					picklist:[[14],[new portalui_arrayMap({items:["01","02","03","04","05","06","07","08","09","10","11","12","A. 01,04,07,10","B. 01,07","C. 01-12"]})]],
					colAlign:[[12,14],[alCenter,alCenter]],
					change:[this,"doChangeCell"],ellipsClick: [this,"doEllipsClick"],defaultRow:1
			});    			
			this.sgNav = new portalui_sgNavigator(this.p1, {bound: [1, 330, 897, 25],grid: this.sg1,border: 0,buttonStyle: 2});		
			this.rearrangeChild(10,23);
			setTipeButton(tbSimpan);
			this.setTabChildIndex(); 

			this.dbLib = new util_dbLib();
		    this.dbLib.addListener(this);
		    this.standarLib = new util_standar();
			
			this.bGen.onClick.set(this, "genClick");
			//this.bCopy.onClick.set(this, "doCopy");
			this.sgNav.onPager.set(this, "doSelectedPage");
			this.sg1.onCellEnter.set(this, "doCellEnter");
			this.standarLib.clearByTag(this,["0","1"],undefined);				
			this.sg1.clear(1);
			
			var data = this.dbLib.getDataProvider("select year(getdate()) +1 as tahun ");
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				line = data.rs.rows[0];							
				this.eTahun.setText(line.tahun);
			}
			this.ePP.setSQL("select kode_pp, nama from agg_pp where kode_lokasi = '"+this.app._lokasi+"' ",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.ePP.setText(this.app._kodePP);
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_budget_transaksi_fAbauBPCC.extend(window.portalui_childForm);
window.app_budget_transaksi_fAbauBPCC.implement({
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
					this.standarLib.clearByTag(this, new Array("0","8"),undefined);				
					this.sg1.clear(1); 
				}
				break;
			case "simpan" :	
				for (var i=0;i< this.sg1.getRowCount();i++){
					if (!this.sg1.rowValid(i)) {
						var j = i+1;
						system.alert(this,"Data tidak valid.","Terdapat data tidak lengkap di baris "+j);
						return false;
					}
				}
				if (!this.standarLib.checkEmptyByTag(this, new Array("0","2"))){
					return false;
				}
				if (this.prog != "0") {
					system.alert(this,"Transaksi tidak valid.","Transaksi Norma Variable telah di Close.");
					return false;
				} 
				
				var vTahun = this.eTahun.getText();
				this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_abau_m','no_abau',this.app._lokasi+"-ABAU"+this.eTahun.getText().substr(2,2)+".",'000'));
				var sql = new server_util_arrayList();
				sql.add("insert into agg_abau_m(no_abau, kode_lokasi, kode_pp, keterangan, jenis, tgl_input, nik_user, progress, tahun)"+
						"                values('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.ePP.getText()+"','-','L',now(), '"+this.app._userLog+"','0','"+this.eTahun.getText()+"') ");
				
				var idx = idx2 = 0;
				for (var i=0;i< this.sg1.getRowCount();i++){
					if (this.sg1.rowValid(i) && this.sg1.cells(17,i) != "0"){
						idx2++;
						sql.add("insert into agg_abau_dt(no_abau,kode_lokasi,kode_rka,kode_drk,kode_pk,kode_var,kode_akun,keterangan,kode_pp,jns_periode,jumlah,volume,nilai,tahun,tarif,no_urut)"+
								" values('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(4,i)+"','"+this.sg1.cells(2,i)+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(6,i)+"' "+
								" ,'"+this.sg1.cells(8,i)+"','"+this.sg1.cells(11,i)+"','"+this.sg1.cells(12,i)+"','"+this.sg1.cells(14,i)+"',"+parseNilai(this.sg1.cells(15,i))+","+parseNilai(this.sg1.cells(16,i))+","+parseNilai(this.sg1.cells(17,i))+",'"+vTahun+"',"+parseNilai(this.sg1.cells(10,i))+","+idx2+")");
						
						if (this.sg1.cells(14,i).substr(0,1) == "A"){
							idx++;
							sql.add("insert into agg_abau_d(no_abau,kode_lokasi,kode_rka,kode_drk,kode_pk,kode_var,kode_akun,keterangan,kode_pp,bulan,jumlah,volume,periode,nilai,tahun,tarif,no_urut,posted,progress)"+
									" values('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(4,i)+"','"+this.sg1.cells(2,i)+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(6,i)+"' "+
									" ,'"+this.sg1.cells(8,i)+"','"+this.sg1.cells(11,i)+"','"+this.sg1.cells(12,i)+"','01',"+parseNilai(this.sg1.cells(15,i))+","+parseNilai(this.sg1.cells(16,i))+",'"+vTahun+"01"+"',"+parseNilai(this.sg1.cells(17,i))+",'"+vTahun+"',"+parseNilai(this.sg1.cells(10,i))+","+idx+",'F','0')");
							idx++;
							sql.add("insert into agg_abau_d(no_abau,kode_lokasi,kode_rka,kode_drk,kode_pk,kode_var,kode_akun,keterangan,kode_pp,bulan,jumlah,volume,periode,nilai,tahun,tarif,no_urut,posted,progress)"+
									" values('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(4,i)+"','"+this.sg1.cells(2,i)+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(6,i)+"' "+
									" ,'"+this.sg1.cells(8,i)+"','"+this.sg1.cells(11,i)+"','"+this.sg1.cells(12,i)+"','04',"+parseNilai(this.sg1.cells(15,i))+","+parseNilai(this.sg1.cells(16,i))+",'"+vTahun+"04"+"',"+parseNilai(this.sg1.cells(17,i))+",'"+vTahun+"',"+parseNilai(this.sg1.cells(10,i))+","+idx+",'F','0')");
							idx++;
							sql.add("insert into agg_abau_d(no_abau,kode_lokasi,kode_rka,kode_drk,kode_pk,kode_var,kode_akun,keterangan,kode_pp,bulan,jumlah,volume,periode,nilai,tahun,tarif,no_urut,posted,progress)"+
									" values('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(4,i)+"','"+this.sg1.cells(2,i)+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(6,i)+"' "+
									" ,'"+this.sg1.cells(8,i)+"','"+this.sg1.cells(11,i)+"','"+this.sg1.cells(12,i)+"','07',"+parseNilai(this.sg1.cells(15,i))+","+parseNilai(this.sg1.cells(16,i))+",'"+vTahun+"07"+"',"+parseNilai(this.sg1.cells(17,i))+",'"+vTahun+"',"+parseNilai(this.sg1.cells(10,i))+","+idx+",'F','0')");
							idx++;
							sql.add("insert into agg_abau_d(no_abau,kode_lokasi,kode_rka,kode_drk,kode_pk,kode_var,kode_akun,keterangan,kode_pp,bulan,jumlah,volume,periode,nilai,tahun,tarif,no_urut,posted,progress)"+
									" values('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(4,i)+"','"+this.sg1.cells(2,i)+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(6,i)+"' "+
									" ,'"+this.sg1.cells(8,i)+"','"+this.sg1.cells(11,i)+"','"+this.sg1.cells(12,i)+"','10',"+parseNilai(this.sg1.cells(15,i))+","+parseNilai(this.sg1.cells(16,i))+",'"+vTahun+"10"+"',"+parseNilai(this.sg1.cells(17,i))+",'"+vTahun+"',"+parseNilai(this.sg1.cells(10,i))+","+idx+",'F','0')");
						} 
						else {
							if (this.sg1.cells(14,i).substr(0,1) == "B"){
								idx++;
								sql.add("insert into agg_abau_d(no_abau,kode_lokasi,kode_rka,kode_drk,kode_pk,kode_var,kode_akun,keterangan,kode_pp,bulan,jumlah,volume,periode,nilai,tahun,tarif,no_urut,posted,progress)"+
										" values('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(4,i)+"','"+this.sg1.cells(2,i)+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(6,i)+"' "+
										" ,'"+this.sg1.cells(8,i)+"','"+this.sg1.cells(11,i)+"','"+this.sg1.cells(12,i)+"','01',"+parseNilai(this.sg1.cells(15,i))+","+parseNilai(this.sg1.cells(16,i))+",'"+vTahun+"01"+"',"+parseNilai(this.sg1.cells(17,i))+",'"+vTahun+"',"+parseNilai(this.sg1.cells(10,i))+","+idx+",'F','0')");
								idx++;
								sql.add("insert into agg_abau_d(no_abau,kode_lokasi,kode_rka,kode_drk,kode_pk,kode_var,kode_akun,keterangan,kode_pp,bulan,jumlah,volume,periode,nilai,tahun,tarif,no_urut,posted,progress)"+
										" values('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(4,i)+"','"+this.sg1.cells(2,i)+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(6,i)+"' "+
										" ,'"+this.sg1.cells(8,i)+"','"+this.sg1.cells(11,i)+"','"+this.sg1.cells(12,i)+"','07',"+parseNilai(this.sg1.cells(15,i))+","+parseNilai(this.sg1.cells(16,i))+",'"+vTahun+"07"+"',"+parseNilai(this.sg1.cells(17,i))+",'"+vTahun+"',"+parseNilai(this.sg1.cells(10,i))+","+idx+",'F','0')");
							}
							else {
								if (this.sg1.cells(14,i).substr(0,1) == "C"){
									for (var j=1; j <= 12; j++){
										idx++;
										sql.add("insert into agg_abau_d(no_abau,kode_lokasi,kode_rka,kode_drk,kode_pk,kode_var,kode_akun,keterangan,kode_pp,bulan,jumlah,volume,periode,nilai,tahun,tarif,no_urut,posted,progress)"+
												" values('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(4,i)+"','"+this.sg1.cells(2,i)+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(6,i)+"' "+
												" ,'"+this.sg1.cells(8,i)+"','"+this.sg1.cells(11,i)+"','"+this.sg1.cells(12,i)+"','"+(j<10?"0":"")+j+"',"+parseNilai(this.sg1.cells(15,i))+","+parseNilai(this.sg1.cells(16,i))+",'"+vTahun+(j<10?"0":"")+j+"',"+parseNilai(this.sg1.cells(17,i))+",'"+vTahun+"',"+parseNilai(this.sg1.cells(10,i))+","+idx+",'F','0')");
									}
								}
								else {
									idx++;
									sql.add("insert into agg_abau_d(no_abau,kode_lokasi,kode_rka,kode_drk,kode_pk,kode_var,kode_akun,keterangan,kode_pp,bulan,jumlah,volume,periode,nilai,tahun,tarif,no_urut,posted,progress)"+
											" values('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(4,i)+"','"+this.sg1.cells(2,i)+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(6,i)+"' "+
											" ,'"+this.sg1.cells(8,i)+"','"+this.sg1.cells(11,i)+"','"+this.sg1.cells(12,i)+"','"+this.sg1.cells(14,i)+"',"+parseNilai(this.sg1.cells(15,i))+","+parseNilai(this.sg1.cells(16,i))+",'"+vTahun+this.sg1.cells(14,i)+"',"+parseNilai(this.sg1.cells(17,i))+",'"+vTahun+"',"+parseNilai(this.sg1.cells(10,i))+","+idx+",'F','0')");
								}
							}
						}
					}
				}			
				sql.add("insert into agg_d (kode_lokasi,kode_pk,kode_drk,kode_rka,kode_akun,kode_pp,periode,bulan,jumlah,volume,nilai,tahun,no_bukti,modul,progress,jenis_agg,keterangan) "+
						"       select a.kode_lokasi,a.kode_pk,a.kode_drk,a.kode_rka,a.kode_akun,a.kode_pp,a.periode,a.bulan,a.jumlah,a.volume,a.nilai,a.tahun,a.no_abau,'ABAU',a.progress,case when b.jenis = 'L' then 'E' else 'T' end as jenis,a.keterangan "+
						"       from agg_abau_d a inner join agg_abau_m b on a.no_abau=b.no_abau and a.kode_lokasi=b.kode_lokasi and a.tahun=b.tahun "+
						"       where a.no_abau='"+this.ed_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ");				
				
				this.dbLib.execArraySQL(sql);
				break;
			case "simpancek" : this.simpan();
				break;
		}
	},
	doChange: function(sender){
		if (sender == this.eTahun && this.eTahun.getText()!="") {
			this.eRef.setSQL("select kode_ref, nama from agg_abau_ref_m where tahun = '"+this.eTahun.getText()+"'",["kode_ref","nama"],false,["Kode","Nama"],"and","Ref. Angg. Norma Biaya Variable",true);
			this.sg1.clear(1);
			
			var data = this.dbLib.getDataProvider("select progress from agg_close where kode_lokasi = '"+this.app._lokasi+"' and modul = 'ABAU' and tahun = '"+this.eTahun.getText()+"'",true);
			if (typeof data == "object"){
				this.prog = data.rs.rows[0].progress;
			}
		}
	},
	doCopy: function(sender){
		try {
			if (this.sg1.rowValid(this.sg1.row)) {
				var data = [];
				for (var i=0;i<this.sg1.getColCount();i++) 	
					data[data.length] = this.sg1.cells(i,this.sg1.row);
				this.sg1.appendData(data);
			}
		} catch(e)
		{
			alert(e);
		}
	},
	doLoadData: function(sender){
		if (sender == this.eRef && this.eRef.getText()!="" && this.eTahun.getText()!="" && this.ePP.getText()!="") {
			this.sg1.clear();
			var data = this.dbLib.getDataProvider(
					   "select b.kode_rka,d.nama as nama_rka,b.kode_drk,e.nama as nama_drk,x.kode_pk,x.nama as nama_pk,b.kode_var,f.nama as nama_var,"+
					   "       b.kode_akun,g.nama as nama_akun,b.jns_periode,b.jumlah,b.volume,b.tarif,b.nilai,b.keterangan "+
					   "from agg_abau_ref b inner join agg_abau_ref_m z on z.kode_ref=b.kode_ref and b.tahun=z.tahun "+
					   "     inner join agg_rka d on b.kode_rka=d.kode_rka and b.tahun=d.tahun "+
					   "     inner join agg_drk e on d.kode_drk=e.kode_drk and d.tahun=e.tahun "+
					   "     inner join agg_pk x on e.kode_pk=x.kode_pk and x.tahun=e.tahun "+
					   "     inner join agg_var f on b.kode_var=f.kode_var "+
					   "     inner join agg_masakun g on b.kode_akun=g.kode_akun and g.kode_lokasi='"+this.app._lokasi+"' "+
					   " where b.kode_ref = '"+this.eRef.getText()+"' and b.tahun = '"+this.eTahun.getText()+"' order by b.no_urut");
			eval("data = "+data+";");				
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg1.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg1.appendData([line.kode_pk,line.nama_pk,line.kode_drk,line.nama_drk,line.kode_rka,line.nama_rka,
										 line.kode_var,line.nama_var,line.kode_akun,line.nama_akun,floatToNilai(line.tarif),  
										 line.keterangan,
										 this.ePP.getText(),this.ePP.rightLabelCaption,
										 line.jns_periode,floatToNilai(line.jumlah),floatToNilai(line.volume),floatToNilai(line.nilai)]);
				}
			} else this.sg1.clear(1);
			this.sg1.validasi();			
		} else {
			system.alert(this,"Referensi dan atau PP tidak valid","");
		}
	},
	genClick: function(sender){
		try{
			if (this.eTahun != "") {
				this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_abau_m','no_abau',this.app._lokasi+"-ABAU"+this.eTahun.getText().substr(2,2)+".",'000'));
				this.ePP.setFocus();
			}
		}
		catch (e){
			alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
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
	doCellEnter: function(sender, col, row){
		switch (col) { 
			case 12 : 
					if (this.sg1.getCell(12,row) == ""){
						if (row == 0) {
							this.sg1.setCell(12,row,this.ePP.getText());
							this.sg1.setCell(13,row,this.ePP.rightLabelCaption);
						}
						else {
							this.sg1.setCell(12,row,this.sg1.getCell(12,(row-1)) );
							this.sg1.setCell(13,row,this.sg1.getCell(13,(row-1)) );
						}
					}
			break;
		}		
	},
	doChangeCell: function(sender, col, row){
		switch (col) {
			case 4:
				var sql = new server_util_arrayList();
				sql.add("select x.kode_drk,x.nama as nama_drk,y.kode_pk,y.nama as nama_pk "+
						"from agg_rka a "+
					    "				inner join agg_drk x on a.kode_drk = x.kode_drk and a.tahun = x.tahun "+
						"				inner join agg_pk y on y.kode_pk = x.kode_pk and y.tahun = x.tahun "+
						"where a.tahun = '" +this.eTahun.getText() +"' and a.kode_rka = '" +this.sg1.cells(4, this.sg1.row) +"' ");
				
				sql.add("select a.kode_var,a.nama as nama_var,c.kode_akun,c.nama as nama_akun,b.tarif "+
						"from agg_var a inner join agg_norma_var b on a.kode_var=b.kode_var and b.tahun = '"+this.eTahun.getText()+"' "+
						"               inner join agg_abau_kamus d on a.kode_var=d.kode_var and d.tahun = '"+this.eTahun.getText()+"' "+
						"               inner join agg_masakun c on b.kode_akun=c.kode_akun and c.kode_lokasi = '"+this.app._lokasi+"' "+
						"where d.kode_rka = '" +this.sg1.cells(4,this.sg1.row) +"' and b.tahun = '" +this.eTahun.getText() +"'");

				var data = this.dbLib.getMultiDataProvider(sql,true);				
				if (typeof data != "string") {					
					if (data.result[0].rs.rows[0] != undefined) {
						var line = data.result[0].rs.rows[0];
						this.sg1.cells(0, row,line.kode_pk);
						this.sg1.cells(1, row,line.nama_pk);
						this.sg1.cells(2, row,line.kode_drk);
						this.sg1.cells(3, row,line.nama_drk);
						this.sg1.cells(6, row,"");
						this.sg1.cells(7, row,"");
						this.sg1.cells(8,row,"");
						this.sg1.cells(9,row,"");
						this.sg1.cells(10,row,"");
					}
					if (data.result[1].rs.rows[0] != undefined) {
						var line = data.result[1].rs.rows[0];
						this.sg1.cells(6, row,line.kode_var);
						this.sg1.cells(7, row,line.nama_var);
						this.sg1.cells(8,row, line.kode_akun);
						this.sg1.cells(9,row, line.nama_akun);
						this.sg1.cells(10,row, floatToNilai(line.tarif));
					}
				}
				break;
			case 5:
				if (this.sg1.cells(11,row) == "") this.sg1.cells(11,row, this.sg1.cells(5,row));
				break;
			case 6:
				var data = this.dbLib.getDataProvider(
						"select c.kode_akun,c.nama as nama_akun,b.tarif "+
						"from agg_norma_var b inner join agg_masakun c on b.kode_akun=c.kode_akun and c.kode_lokasi = '"+this.app._lokasi+"' "+
						"where b.kode_var = '" +this.sg1.cells(6,this.sg1.row) +"' and b.tahun = '" +this.eTahun.getText() +"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line !== undefined) {
						this.sg1.cells(8,row, line.kode_akun);
						this.sg1.cells(9,row, line.nama_akun);
						this.sg1.cells(10,row, floatToNilai(line.tarif));
					}
				}
				break;
			case 10 : 
			case 15 : 
			case 16 : 
					if (this.sg1.cells(10,row) != "" && this.sg1.cells(15,row) != "" && this.sg1.cells(16,row) != "") {
						var vTot = nilaiToFloat(this.sg1.cells(10,row)) * nilaiToFloat(this.sg1.cells(15,row)) * nilaiToFloat(this.sg1.cells(16,row));
						this.sg1.cells(17,row,vTot);
					}
			break;
		}		
	},
	doEllipsClick: function(sender, col, row) {
		try
		{
			switch(col){
				case 4 :
						this.standarLib.showListDataForSG(this, "Daftar RKA",this.sg1, this.sg1.row, this.sg1.col, 
														"select a.kode_rka,a.nama,b.kode_drk,b.nama as nama_drk   from agg_rka a inner join agg_drk b on a.kode_drk=b.kode_drk and a.tahun=b.tahun where a.tahun = '"+this.eTahun.getText()+"' and a.tf_aktif='1' ",
														"select count(kode_rka) from agg_rka where tahun = '"+this.eTahun.getText()+"' and tf_aktif='1' ",
														 new Array("a.kode_rka","a.nama","b.kode_drk","b.nama_drk"),"and",new Array("Kode RKA","Nama RKA","Kode DRK","Nama DRK"),false);					
						break;								  
				case 6 : 
						this.jenisRKA = "UNLOCK";
						var data = this.dbLib.runSQL("select top 1 jenis from agg_abau_kamus where kode_rka='"+this.sg1.cells(4,row)+"' and tahun ='"+this.eTahun.getText()+"'");
						if (data instanceof portalui_arrayMap){
							if (data.get(0) != undefined){
								line = data.get(0);
								this.jenisRKA = line.get("jenis");
							} 
						}
						if (this.jenisRKA.toUpperCase() == "UNLOCK") {
							this.standarLib.showListDataForSG(this, "Daftar Variable Biaya",this.sg1, this.sg1.row, this.sg1.col, 
														"select a.kode_var,a.nama,b.tarif from agg_var a inner join agg_norma_var b on a.kode_var=b.kode_var where b.tahun = '"+this.eTahun.getText()+"'",
														"select count(a.kode_var) from agg_var a inner join agg_norma_var b on a.kode_var=b.kode_var where b.tahun = '"+this.eTahun.getText()+"'",
														 new Array("a.kode_var","a.nama","b.tarif"),"and",new Array("Kode","Nama","Tarif"),false);					
						}
						else {
							this.standarLib.showListDataForSG(this, "Daftar Variable Biaya",this.sg1, this.sg1.row, this.sg1.col, 
														"select a.kode_var,a.namab.tarif from agg_var a inner join agg_norma_var b on a.kode_var=b.kode_var and b.tahun='"+this.eTahun.getText()+"' inner join agg_abau_kamus c on b.kode_var=c.kode_var and c.tahun=b.tahun where c.kode_rka = '"+this.sg1.cells(4,row)+"' and b.tahun = '"+this.eTahun.getText()+"'",
														"select count(a.kode_var) from agg_var a inner join agg_norma_var b on a.kode_var=b.kode_var and b.tahun='"+this.eTahun.getText()+"' inner join agg_abau_kamus c on b.kode_var=c.kode_var and c.tahun=b.tahun where c.kode_rka = '"+this.sg1.cells(4,row)+"' and b.tahun = '"+this.eTahun.getText()+"'",
														 new Array("a.kode_var","a.nama","b.tarif"),"and",new Array("Kode","Nama","Tarif"),false);				
						
						}
						break;								  
				case 12 : 
					this.standarLib.showListDataForSG(this, "Daftar PP",this.sg1, this.sg1.row, this.sg1.col, 
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
});
