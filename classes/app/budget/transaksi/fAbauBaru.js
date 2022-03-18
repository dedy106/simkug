/**
 * @author dweexfuad, mr
 
 ------> if agg_abau_kamus.jenis = LOCK then inner else keluarin semua variable 
 
 */
window.app_budget_transaksi_fAbauBaru = function(owner)
{
	if (owner)
	{
		window.app_budget_transaksi_fAbauBaru.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_transaksi_fAbauBaru";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Anggaran Biaya Variable Program Baru [per RKA]: Input", 0);
		try{	
			uses("portalui_datePicker;portalui_saiGrid;portalui_sgNavigator");			
			this.eTahun = new portalui_saiLabelEdit(this,{bound:[20,12,180,20],caption:"Tahun Anggaran",tipeText:ttAngka,maxLength:4,tag:2,change:[this,"doChange"]});
	        this.ed_nb = new portalui_saiLabelEdit(this, {bound: [20, 78, 230, 20],caption: "No Bukti",readOnly:true});			
			this.bGen = new portalui_button(this, {bound: [256, 78, 80, 20],caption: "Gen",icon: "url(icon/" + system.getThemes() + "/process.png)"});				
			this.ePP = new portalui_saiCBBL(this,{bound:[20,11,200,20],caption:"PP", multiSelection:false,tag:2,change:[this,"doChange"]});	
			this.ePK = new portalui_saiCBBL(this,{bound:[20,24,200,20],caption:"Kode PK", multiSelection:false,change:[this,"doChange"],tag:2});					
			this.eDRK = new portalui_saiCBBL(this,{bound:[20,25,200,20],caption:"Kode DRK", multiSelection:false,change:[this,"doChange"],tag:2});					
			this.eTotal = new saiLabelEdit(this,{bound:[600,25,200,20], caption:"Total", readOnly:true, tipeText:ttNilai, text:"0"});
			this.i_viewer = new portalui_imageButton(this,{bound:[800,25,20,20],hint:"Hitung Total",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitung"]});
			this.bCopy = new portalui_button(this, {bound: [840, 25, 80, 20],caption: "Copy Baris"});				
			
			this.p1 = new portalui_panel(this,{bound: [20, 232, 900, 375],caption: "Daftar Item"});	    				
			this.sg1 = new portalui_saiGrid(this.p1, {bound: [1, 20, 895, 328],colCount: 12,
					colTitle:["Kode Var","Nama Variabel","Kode Akun","Nama Akun","Tarif",
							  "Deskripsi",
							  "Kode PP","Nama PP",
							  "Jns Periode","Jumlah","Volume","Total"],
					colWidth:[[11,10,9,8,7,6,5,4,3,2,1,0],
					         [100,70,70,100,  100,60,  200,  70,150,80,150,70]],
					colFormat:[[4,9,10,11],[cfNilai,cfNilai,cfNilai,cfNilai]],
					buttonStyle:[[0,6,8],[bsEllips,bsEllips,bsAuto]],
					columnReadOnly:[true,[0,1,2,3,4, 6,7,8,11],[5,9,10]],
					picklist:[[8],[new portalui_arrayMap({items:["01","02","03","04","05","06","07","08","09","10","11","12","A. 01,04,07,10","B. 01,07","C. 01-12"]})]],
					change:[this,"doChangeCell"],ellipsClick: [this,"doEllipsClick"],defaultRow:1
			});    			
			this.sgNav = new portalui_sgNavigator(this.p1, {bound: [1, 350, 897, 25],grid: this.sg1,border: 0,buttonStyle: 2});		
			this.rearrangeChild(10,23);
			setTipeButton(tbSimpan);
			this.setTabChildIndex(); 

			this.dbLib = new util_dbLib();
		    this.dbLib.addListener(this);
		    this.standarLib = new util_standar();
			
			this.bGen.onClick.set(this, "genClick");
			this.bCopy.onClick.set(this, "doCopy");
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
			
			if (this.app._userStatus == "A")
				this.ePP.setSQL("select kode_pp, nama,kode_bidang from agg_pp where kode_lokasi = '"+this.app._lokasi+"' ",["kode_pp","nama","kode_bidang"],false,["Kode","Nama","Bidang"],"and","Data PP",true);
			else this.ePP.setSQL("select kode_pp, nama,kode_bidang from agg_pp where kode_bidang = '"+this.app._kodeBidang+"' and kode_lokasi = '"+this.app._lokasi+"' ",["kode_pp","nama","kode_bidang"],false,["Kode","Nama","Bidang"],"and","Data PP",true);
			this.ePP.setText(this.app._kodePP);
			this.kodeBidang = this.app._kodeBidang;

			var data = this.dbLib.getDataProvider("select progress from agg_close where kode_lokasi = '"+this.app._lokasi+"' and modul = 'ABAU' and tahun = '"+this.eTahun.getText()+"'",true);
			if (typeof data == "object"){
				this.prog = data.rs.rows[0].progress;
			}
			var data2 = this.dbLib.getDataProvider("select progress from agg_app where kode_lokasi = '"+this.app._lokasi+"' and modul = 'ABAU' and tahun = '"+this.eTahun.getText()+"' and kode_bidang='"+this.kodeBidang+"' ",true);
			if (typeof data2 == "object"){
				this.progApp = data2.rs.rows[0].progress;
			}

		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_budget_transaksi_fAbauBaru.extend(window.portalui_childForm);
window.app_budget_transaksi_fAbauBaru.implement({
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
					else {
						var vTot = Math.round(nilaiToFloat(this.sg1.cells(4,i)) * nilaiToFloat(this.sg1.cells(9,i)) * nilaiToFloat(this.sg1.cells(10,i)));
						this.sg1.cells(11,i,vTot);
					}
				}
				if (!this.standarLib.checkEmptyByTag(this, new Array("0","2"))){
					system.alert(this,"Transaksi tidak valid.","Data tidak lengkap.");
					return false;
				}
				if (this.prog != "0") {
					system.alert(this,"Transaksi tidak valid.","Transaksi Norma Variable telah di Close.");
					return false;
				} 
				if (this.progApp != "0") {
					system.alert(this,"Transaksi Norma Variable PP : "+this.ePP.rightLabelCaption+" telah di Approve.","Transaksi tidak dapat disimpan.");
					return false;
				}
				
				var vTahun = this.eTahun.getText();
				this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_abau_m','no_abau',this.app._lokasi+"-ABAU"+this.eTahun.getText().substr(2,2)+".",'000'));
				this.kodeRKA = this.standarLib.noBuktiOtomatis(this.dbLib,'agg_rka','kode_rka',this.eDRK.getText(),'00');				
				
				var sql = new server_util_arrayList();
				sql.add("insert into agg_abau_m(no_abau, kode_lokasi, kode_pp, keterangan, jenis, tgl_input, nik_user, progress, tahun)"+
						"                values('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.ePP.getText()+"','-','B',now(), '"+this.app._userLog+"','0','"+this.eTahun.getText()+"') ");
				sql.add("insert into agg_rka (kode_rka,kode_drk,kode_pk,nama,tahun,tf_aktif,status) values "+
							" ('"+this.kodeRKA+"','"+this.eDRK.getText()+"','"+this.ePK.getText()+"','"+this.sg1.cells(5,0)+"','"+this.eTahun.getText()+"','1','B')");
							
				var idx = idx2 = 0;
				for (var i=0;i< this.sg1.getRowCount();i++){
					if (this.sg1.rowValid(i) && this.sg1.cells(11,i) != "0"){
						idx2++;
						sql.add("insert into agg_abau_dt(no_abau,kode_lokasi,kode_rka,kode_drk,kode_pk,kode_var,kode_akun,keterangan,kode_pp,jns_periode,jumlah,volume,nilai,tahun,tarif,no_urut,jenis_agg)"+
								" values('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.kodeRKA+"','"+this.eDRK.getText()+"','"+this.ePK.getText()+"','"+this.sg1.cells(0,i)+"' "+
								" ,'"+this.sg1.cells(2,i)+"','"+this.sg1.cells(5,i)+"','"+this.sg1.cells(6,i)+"','"+this.sg1.cells(8,i)+"',"+parseNilai(this.sg1.cells(9,i))+","+parseNilai(this.sg1.cells(10,i))+","+parseNilai(this.sg1.cells(11,i))+",'"+vTahun+"',"+parseNilai(this.sg1.cells(4,i))+","+idx2+",'B')");
						
						if (this.sg1.cells(8,i).substr(0,1) == "A"){
							idx++;
							sql.add("insert into agg_abau_d(no_abau,kode_lokasi,kode_rka,kode_drk,kode_pk,kode_var,kode_akun,keterangan,kode_pp,bulan,jumlah,volume,periode,nilai,tahun,tarif,no_urut,posted,progress,jenis_agg)"+
									" values('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.kodeRKA+"','"+this.eDRK.getText()+"','"+this.ePK.getText()+"','"+this.sg1.cells(0,i)+"' "+
									" ,'"+this.sg1.cells(2,i)+"','"+this.sg1.cells(5,i)+"','"+this.sg1.cells(6,i)+"','01',"+parseNilai(this.sg1.cells(9,i))+","+parseNilai(this.sg1.cells(10,i))+",'"+vTahun+"01"+"',"+parseNilai(this.sg1.cells(11,i))+",'"+vTahun+"',"+parseNilai(this.sg1.cells(4,i))+","+idx+",'F','0','B')");
							idx++;
							sql.add("insert into agg_abau_d(no_abau,kode_lokasi,kode_rka,kode_drk,kode_pk,kode_var,kode_akun,keterangan,kode_pp,bulan,jumlah,volume,periode,nilai,tahun,tarif,no_urut,posted,progress,jenis_agg)"+
									" values('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.kodeRKA+"','"+this.eDRK.getText()+"','"+this.ePK.getText()+"','"+this.sg1.cells(0,i)+"' "+
									" ,'"+this.sg1.cells(2,i)+"','"+this.sg1.cells(5,i)+"','"+this.sg1.cells(6,i)+"','04',"+parseNilai(this.sg1.cells(9,i))+","+parseNilai(this.sg1.cells(10,i))+",'"+vTahun+"04"+"',"+parseNilai(this.sg1.cells(11,i))+",'"+vTahun+"',"+parseNilai(this.sg1.cells(4,i))+","+idx+",'F','0','B')");
							idx++;
							sql.add("insert into agg_abau_d(no_abau,kode_lokasi,kode_rka,kode_drk,kode_pk,kode_var,kode_akun,keterangan,kode_pp,bulan,jumlah,volume,periode,nilai,tahun,tarif,no_urut,posted,progress,jenis_agg)"+
									" values('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.kodeRKA+"','"+this.eDRK.getText()+"','"+this.ePK.getText()+"','"+this.sg1.cells(0,i)+"' "+
									" ,'"+this.sg1.cells(2,i)+"','"+this.sg1.cells(5,i)+"','"+this.sg1.cells(6,i)+"','07',"+parseNilai(this.sg1.cells(9,i))+","+parseNilai(this.sg1.cells(10,i))+",'"+vTahun+"07"+"',"+parseNilai(this.sg1.cells(11,i))+",'"+vTahun+"',"+parseNilai(this.sg1.cells(4,i))+","+idx+",'F','0','B')");
							idx++;
							sql.add("insert into agg_abau_d(no_abau,kode_lokasi,kode_rka,kode_drk,kode_pk,kode_var,kode_akun,keterangan,kode_pp,bulan,jumlah,volume,periode,nilai,tahun,tarif,no_urut,posted,progress,jenis_agg)"+
									" values('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.kodeRKA+"','"+this.eDRK.getText()+"','"+this.ePK.getText()+"','"+this.sg1.cells(0,i)+"' "+
									" ,'"+this.sg1.cells(2,i)+"','"+this.sg1.cells(5,i)+"','"+this.sg1.cells(6,i)+"','10',"+parseNilai(this.sg1.cells(9,i))+","+parseNilai(this.sg1.cells(10,i))+",'"+vTahun+"10"+"',"+parseNilai(this.sg1.cells(11,i))+",'"+vTahun+"',"+parseNilai(this.sg1.cells(4,i))+","+idx+",'F','0','B')");
						} 
						else {
							if (this.sg1.cells(8,i).substr(0,1) == "B"){
								idx++;
								sql.add("insert into agg_abau_d(no_abau,kode_lokasi,kode_rka,kode_drk,kode_pk,kode_var,kode_akun,keterangan,kode_pp,bulan,jumlah,volume,periode,nilai,tahun,tarif,no_urut,posted,progress,jenis_agg)"+
										" values('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.kodeRKA+"','"+this.eDRK.getText()+"','"+this.ePK.getText()+"','"+this.sg1.cells(0,i)+"' "+
										" ,'"+this.sg1.cells(2,i)+"','"+this.sg1.cells(5,i)+"','"+this.sg1.cells(6,i)+"','01',"+parseNilai(this.sg1.cells(9,i))+","+parseNilai(this.sg1.cells(10,i))+",'"+vTahun+"01"+"',"+parseNilai(this.sg1.cells(11,i))+",'"+vTahun+"',"+parseNilai(this.sg1.cells(4,i))+","+idx+",'F','0','B')");
								idx++;
								sql.add("insert into agg_abau_d(no_abau,kode_lokasi,kode_rka,kode_drk,kode_pk,kode_var,kode_akun,keterangan,kode_pp,bulan,jumlah,volume,periode,nilai,tahun,tarif,no_urut,posted,progress,jenis_agg)"+
										" values('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.kodeRKA+"','"+this.eDRK.getText()+"','"+this.ePK.getText()+"','"+this.sg1.cells(0,i)+"' "+
										" ,'"+this.sg1.cells(2,i)+"','"+this.sg1.cells(5,i)+"','"+this.sg1.cells(6,i)+"','07',"+parseNilai(this.sg1.cells(9,i))+","+parseNilai(this.sg1.cells(10,i))+",'"+vTahun+"07"+"',"+parseNilai(this.sg1.cells(11,i))+",'"+vTahun+"',"+parseNilai(this.sg1.cells(4,i))+","+idx+",'F','0','B')");
							}
							else {
								if (this.sg1.cells(8,i).substr(0,1) == "C"){
									for (var j=1; j <= 12; j++){
										idx++;
										sql.add("insert into agg_abau_d(no_abau,kode_lokasi,kode_rka,kode_drk,kode_pk,kode_var,kode_akun,keterangan,kode_pp,bulan,jumlah,volume,periode,nilai,tahun,tarif,no_urut,posted,progress,jenis_agg)"+
												" values('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.kodeRKA+"','"+this.eDRK.getText()+"','"+this.ePK.getText()+"','"+this.sg1.cells(0,i)+"' "+
												" ,'"+this.sg1.cells(2,i)+"','"+this.sg1.cells(5,i)+"','"+this.sg1.cells(6,i)+"','"+(j<10?"0":"")+j+"',"+parseNilai(this.sg1.cells(9,i))+","+parseNilai(this.sg1.cells(10,i))+",'"+vTahun+(j<10?"0":"")+j+"',"+parseNilai(this.sg1.cells(11,i))+",'"+vTahun+"',"+parseNilai(this.sg1.cells(4,i))+","+idx+",'F','0','B')");
									}
								}
								else {
									idx++;
									sql.add("insert into agg_abau_d(no_abau,kode_lokasi,kode_rka,kode_drk,kode_pk,kode_var,kode_akun,keterangan,kode_pp,bulan,jumlah,volume,periode,nilai,tahun,tarif,no_urut,posted,progress,jenis_agg)"+
											" values('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.kodeRKA+"','"+this.eDRK.getText()+"','"+this.ePK.getText()+"','"+this.sg1.cells(0,i)+"' "+
											" ,'"+this.sg1.cells(2,i)+"','"+this.sg1.cells(5,i)+"','"+this.sg1.cells(6,i)+"','"+this.sg1.cells(8,i)+"',"+parseNilai(this.sg1.cells(9,i))+","+parseNilai(this.sg1.cells(10,i))+",'"+vTahun+this.sg1.cells(8,i)+"',"+parseNilai(this.sg1.cells(11,i))+",'"+vTahun+"',"+parseNilai(this.sg1.cells(4,i))+","+idx+",'F','0','B')");
								}
							}
						}
					}
				}			
				sql.add("insert into agg_d (kode_lokasi,kode_pk,kode_drk,kode_rka,kode_akun,kode_pp,periode,bulan,jumlah,volume,nilai,tahun,no_bukti,modul,progress,jenis_agg,keterangan) "+
						"       select a.kode_lokasi,a.kode_pk,a.kode_drk,a.kode_rka,a.kode_akun,a.kode_pp,a.periode,a.bulan,a.jumlah,a.volume,a.nilai,a.tahun,a.no_abau,'ABAU',a.progress,case when a.jenis_agg = 'L' then 'E' else 'T' end as jenis,a.keterangan "+
						"       from agg_abau_d a "+//inner join agg_abau_m b on a.no_abau=b.no_abau and a.kode_lokasi=b.kode_lokasi and a.tahun=b.tahun "+
						"       where a.no_abau='"+this.ed_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ");				
				
				this.dbLib.execArraySQL(sql);
				break;
			case "simpancek" : this.simpan();
				break;
		}
	},
	doChange: function(sender){
		if (sender == this.ePP && this.ePP.getText()!="") {
			this.kodeBidang = this.ePP.dataFromList[2];
		}
		if (sender == this.eTahun && this.eTahun.getText()!="") {
			this.ePK.setSQL("select kode_pk, nama from agg_pk where tahun = '"+this.eTahun.getText()+"' ",["kode_pk","nama"],false,["Kode PK","Nama"],"and","Data Program Kerja",true);
			var data = this.dbLib.getDataProvider("select progress from agg_close where kode_lokasi = '"+this.app._lokasi+"' and modul = 'ABAU' and tahun = '"+this.eTahun.getText()+"'",true);
			if (typeof data == "object"){
				this.prog = data.rs.rows[0].progress;
			}
		}
		if (sender == this.ePP && this.ePP.getText()!="") {
			var data2 = this.dbLib.getDataProvider("select progress from agg_app where kode_lokasi = '"+this.app._lokasi+"' and modul = 'ABAU' and tahun = '"+this.eTahun.getText()+"' and kode_bidang='"+this.kodeBidang+"' ",true);
			if (typeof data2 == "object"){
				this.progApp = data2.rs.rows[0].progress;
			}
		}		
		if (sender == this.ePK && this.ePK.getText()!="") {
			this.eDRK.setSQL("select kode_drk, nama from agg_drk where kode_pk = '"+this.ePK.getText()+"' and tahun = '"+this.eTahun.getText()+"' ",["kode_drk","nama"],false,["Kode DRK","Nama"],"and","Data DRK",true);
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
			case 6 : 
					if (this.sg1.getCell(6,row) == ""){
						if (row == 0) {
							this.sg1.setCell(6,row,this.ePP.getText());
							this.sg1.setCell(7,row,this.ePP.rightLabelCaption);
						}
						else {
							this.sg1.setCell(6,row,this.sg1.getCell(6,(row-1)) );
							this.sg1.setCell(7,row,this.sg1.getCell(7,(row-1)) );
						}
					}
			break;
		}		
	},
	doChangeCell: function(sender, col, row){
		switch (col) {
			case 0:
				var data = this.dbLib.getDataProvider(
						"select c.kode_akun,c.nama as nama_akun,b.tarif "+
						"from agg_norma_var b inner join agg_masakun c on b.kode_akun=c.kode_akun and c.kode_lokasi = '"+this.app._lokasi+"' "+
						"where b.kode_var = '" +this.sg1.cells(0,this.sg1.row) +"' and b.tahun = '" +this.eTahun.getText() +"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line !== undefined) {
						this.sg1.cells(2,row, line.kode_akun);
						this.sg1.cells(3,row, line.nama_akun);
						this.sg1.cells(4,row, floatToNilai(line.tarif));
					}
				}
				break;
			case 4 : 
			case 9 : 
			case 10 : 
					if (this.sg1.cells(4,row) != "" && this.sg1.cells(9,row) != "" && this.sg1.cells(10,row) != "") {
						var vTot = Math.round(nilaiToFloat(this.sg1.cells(4,row)) * nilaiToFloat(this.sg1.cells(9,row)) * nilaiToFloat(this.sg1.cells(10,row)));
						this.sg1.cells(11,row,vTot);
					}
			break;
		}		
	},
	doHitung: function(sender){
		var tot=tot1 = 0;			
		for (var i = 0;i < this.sg1.getRowCount();i++){
			if (this.sg1.cells(4,i) != "" && this.sg1.cells(9,i) != "" && this.sg1.cells(10,i) != "") {
				tot = Math.round(nilaiToFloat(this.sg1.cells(4,i)) * nilaiToFloat(this.sg1.cells(9,i)) * nilaiToFloat(this.sg1.cells(10,i)));
				this.sg1.cells(11,i,tot);
				tot1 += tot;
			}
		}
		this.eTotal.setText(floatToNilai(tot1));
	},	
	doEllipsClick: function(sender, col, row) {
		try
		{
			switch(col){
				case 0 : 
						this.standarLib.showListDataForSG(this, "Daftar Variable Biaya",this.sg1, this.sg1.row, this.sg1.col, 
														"select a.kode_var,a.nama,b.tarif from agg_var a inner join agg_norma_var b on a.kode_var=b.kode_var where b.tahun = '"+this.eTahun.getText()+"'",
														"select count(a.kode_var) from agg_var a inner join agg_norma_var b on a.kode_var=b.kode_var where b.tahun = '"+this.eTahun.getText()+"'",
														 new Array("a.kode_var","a.nama","b.tarif"),"and",new Array("Kode","Nama","Tarif"),false);					
						break;								  
				case 6 : 
					if (this.app._userStatus == "A") {
						this.standarLib.showListDataForSG(this, "Daftar PP",this.sg1, this.sg1.row, this.sg1.col, 
														  "select kode_pp,nama   from agg_pp where kode_lokasi='"+this.app._lokasi+"' and tipe='posting'",
														  "select count(kode_pp) from agg_pp where kode_lokasi='"+this.app._lokasi+"' and tipe='posting'",
														  new Array("kode_pp","nama"),"and",new Array("Kode","Nama"),false);
					}
					else {
						this.standarLib.showListDataForSG(this, "Daftar PP",this.sg1, this.sg1.row, this.sg1.col, 
														  "select kode_pp,nama   from agg_pp where kode_bidang = '"+this.app._kodeBidang+"' and kode_lokasi='"+this.app._lokasi+"' and tipe='posting'",
														  "select count(kode_pp) from agg_pp where kode_bidang = '"+this.app._kodeBidang+"' and kode_lokasi='"+this.app._lokasi+"' and tipe='posting'",
														  new Array("kode_pp","nama"),"and",new Array("Kode","Nama"),false);					
					}
					break;
			}
		}catch(e)
		{
			systemAPI.alert("[app_saku_gl_transaksi_fJu2] : doFindBtnClick : " + e);
		}
	}
});
