/**
 * @author dweexfuad, mr
 ------> if agg_abau_kamus.jenis = LOCK then inner else keluarin semua variable 
 */
window.app_budget_transaksi_fAbauk = function(owner)
{
	if (owner)
	{
		window.app_budget_transaksi_fAbauk.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_transaksi_fAbauk";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Anggaran Biaya Variable : Koreksi", 0);
		try{	
			uses("portalui_datePicker;portalui_saiGrid;portalui_sgNavigator");			
			this.eTahun = new portalui_saiLabelEdit(this,{bound:[20,12,180,20],caption:"Tahun Anggaran",tipeText:ttAngka,maxLength:4,tag:2,change:[this,"doChange"]});
	        this.ePP = new portalui_saiCBBL(this,{bound:[20,11,200,20],caption:"PP", multiSelection:false,tag:2,change:[this,"doChange"]});	
			this.ed_nb = new portalui_saiCBBL(this, {bound: [20, 78, 230, 20],caption: "No Bukti", multiSelection:false, readOnly:true, change:[this,"doLoadData"] });			
			this.cJenis = new portalui_saiLabelEdit(this,{bound:[20,12,180,20],caption:"Jenis Program", readOnly:true});
			this.eCari = new portalui_saiLabelEdit(this,{bound:[470,12,180,20],caption:"Cari RKA", tag:9});
			this.i_cari = new portalui_imageButton(this,{bound:[650,12,20,20],hint:"Cari",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doCariClick"]});
			this.eTotal = new saiLabelEdit(this,{bound:[700,12,200,20], caption:"Total", readOnly:true, tipeText:ttNilai, text:"0"});
			this.i_viewer = new portalui_imageButton(this,{bound:[900,12,20,20],hint:"Hitung Total",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitung"]});
			
			this.p1 = new portalui_panel(this,{bound: [20, 232, 900, 385],caption: "Daftar Item"});	    				
			this.sg1 = new portalui_saiGrid(this.p1, {bound: [1, 20, 895, 338],colCount: 19,
					colTitle:[
							  "Kode PK","Nama PK","Kode DRK","Nama DRK","Kode RKA","Nama RKA",  
							  "Kode Var","Nama Variabel","Kode Akun","Nama Akun","Tarif",
							  "Deskripsi",
							  "Kode PP","Nama PP",
							  "Jns Periode","Jumlah","Volume","Total","Status"],
					colWidth:[[18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],
					         [80,100,70,70,100,  100,60,  200,  70,150,80,150,70   ,150,80,150,80,150,80]],
					colFormat:[[10,15,16,17],[cfNilai,cfNilai,cfNilai,cfNilai]],
					colHide: [[0,1,2,3],true],
					buttonStyle:[[4,6,12,14,18],[bsEllips,bsEllips,bsEllips,bsAuto,bsAuto]],
					columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9,10, 12,13,14,17,18],[11,15,16]],
					picklist:[[14,18],[new portalui_arrayMap({items:["01","02","03","04","05","06","07","08","09","10","11","12","A. 01,04,07,10","B. 01,07","C. 01-12"]}),new portalui_arrayMap({items:["BARU","LAMA"]})]],
					colAlign:[[12,14],[alCenter,alCenter]],
					change:[this,"doChangeCell"],ellipsClick: [this,"doEllipsClick"],defaultRow:1
			});    			
			this.sgNav = new portalui_sgNavigator(this.p1, {bound: [1, 360, 897, 25],grid: this.sg1,border: 0,buttonStyle: 2});		
			this.rearrangeChild(10,23);
			setTipeButton(tbUbahHapus);
			this.setTabChildIndex(); 

			this.dbLib = new util_dbLib();
		    this.dbLib.addListener(this);
		    this.standarLib = new util_standar();
			
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
window.app_budget_transaksi_fAbauk.extend(window.portalui_childForm);
window.app_budget_transaksi_fAbauk.implement({
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
			case "ubah" :	
				if (!this.standarLib.checkEmptyByTag(this, new Array("0","2"))){
					return false;
				}
				if (this.progApp != "0") {
					system.alert(this,"Transaksi Norma Variable PP : "+this.ePP.rightLabelCaption+" telah di Approve.","Transaksi tidak dapat disimpan.");
					return false;
				}			
				if (this.prog != "0") {
					system.alert(this,"Transaksi tidak valid.","Transaksi Norma Variable telah di Close.");
					return false;
				} 
				for (var i=0;i< this.sg1.getRowCount();i++){
					if (!this.sg1.rowValid(i)) {
						var j = i+1;
						system.alert(this,"Data tidak valid.","Terdapat data tidak lengkap di baris "+j);
						return false;
					} 
					else {
						var vTot = Math.round(nilaiToFloat(this.sg1.cells(10,i)) * nilaiToFloat(this.sg1.cells(15,i)) * nilaiToFloat(this.sg1.cells(16,i)));
						this.sg1.cells(17,i,vTot);
					}
				}				
				var vTahun = this.eTahun.getText();
				var sql = new server_util_arrayList();
				
				sql.add("delete from agg_abau_m where no_abau = '"+this.ed_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
				sql.add("delete from agg_abau_dt where no_abau = '"+this.ed_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
				sql.add("delete from agg_abau_d where no_abau = '"+this.ed_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
				sql.add("delete from agg_d where modul = 'ABAU' and no_bukti = '"+this.ed_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
				
				sql.add("insert into agg_abau_m(no_abau, kode_lokasi, kode_pp, keterangan, jenis, tgl_input, nik_user, progress, tahun)"+
						"                values('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.ePP.getText()+"','-','"+this.cJenis.getText().substr(0,1)+"',now(), '"+this.app._userLog+"','0','"+this.eTahun.getText()+"') ");
				
				var idx = idx2 = 0;
				for (var i=0;i< this.sg1.getRowCount();i++){
					if (this.sg1.rowValid(i) && this.sg1.cells(17,i) != "0"){
						idx2++;
						sql.add("insert into agg_abau_dt(no_abau,kode_lokasi,kode_rka,kode_drk,kode_pk,kode_var,kode_akun,keterangan,kode_pp,jns_periode,jumlah,volume,nilai,tahun,tarif,no_urut,jenis_agg)"+
								" values('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(4,i)+"','"+this.sg1.cells(2,i)+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(6,i)+"' "+
								" ,'"+this.sg1.cells(8,i)+"','"+this.sg1.cells(11,i)+"','"+this.sg1.cells(12,i)+"','"+this.sg1.cells(14,i)+"',"+parseNilai(this.sg1.cells(15,i))+","+parseNilai(this.sg1.cells(16,i))+","+parseNilai(this.sg1.cells(17,i))+",'"+vTahun+"',"+parseNilai(this.sg1.cells(10,i))+","+idx2+",'"+this.sg1.cells(18,i).substr(0,1)+"')");
								
						if (this.sg1.cells(14,i).substr(0,1) == "A"){
							idx++;
							sql.add("insert into agg_abau_d(no_abau,kode_lokasi,kode_rka,kode_drk,kode_pk,kode_var,kode_akun,keterangan,kode_pp,bulan,jumlah,volume,periode,nilai,tahun,tarif,no_urut,posted,progress,jenis_agg)"+
									" values('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(4,i)+"','"+this.sg1.cells(2,i)+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(6,i)+"' "+
									" ,'"+this.sg1.cells(8,i)+"','"+this.sg1.cells(11,i)+"','"+this.sg1.cells(12,i)+"','01',"+parseNilai(this.sg1.cells(15,i))+","+parseNilai(this.sg1.cells(16,i))+",'"+vTahun+"01"+"',"+parseNilai(this.sg1.cells(17,i))+",'"+vTahun+"',"+parseNilai(this.sg1.cells(10,i))+","+idx+",'F','0','"+this.sg1.cells(18,i).substr(0,1)+"')");
							idx++;
							sql.add("insert into agg_abau_d(no_abau,kode_lokasi,kode_rka,kode_drk,kode_pk,kode_var,kode_akun,keterangan,kode_pp,bulan,jumlah,volume,periode,nilai,tahun,tarif,no_urut,posted,progress,jenis_agg)"+
									" values('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(4,i)+"','"+this.sg1.cells(2,i)+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(6,i)+"' "+
									" ,'"+this.sg1.cells(8,i)+"','"+this.sg1.cells(11,i)+"','"+this.sg1.cells(12,i)+"','04',"+parseNilai(this.sg1.cells(15,i))+","+parseNilai(this.sg1.cells(16,i))+",'"+vTahun+"04"+"',"+parseNilai(this.sg1.cells(17,i))+",'"+vTahun+"',"+parseNilai(this.sg1.cells(10,i))+","+idx+",'F','0','"+this.sg1.cells(18,i).substr(0,1)+"')");
							idx++;
							sql.add("insert into agg_abau_d(no_abau,kode_lokasi,kode_rka,kode_drk,kode_pk,kode_var,kode_akun,keterangan,kode_pp,bulan,jumlah,volume,periode,nilai,tahun,tarif,no_urut,posted,progress,jenis_agg)"+
									" values('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(4,i)+"','"+this.sg1.cells(2,i)+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(6,i)+"' "+
									" ,'"+this.sg1.cells(8,i)+"','"+this.sg1.cells(11,i)+"','"+this.sg1.cells(12,i)+"','07',"+parseNilai(this.sg1.cells(15,i))+","+parseNilai(this.sg1.cells(16,i))+",'"+vTahun+"07"+"',"+parseNilai(this.sg1.cells(17,i))+",'"+vTahun+"',"+parseNilai(this.sg1.cells(10,i))+","+idx+",'F','0','"+this.sg1.cells(18,i).substr(0,1)+"')");
							idx++;
							sql.add("insert into agg_abau_d(no_abau,kode_lokasi,kode_rka,kode_drk,kode_pk,kode_var,kode_akun,keterangan,kode_pp,bulan,jumlah,volume,periode,nilai,tahun,tarif,no_urut,posted,progress,jenis_agg)"+
									" values('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(4,i)+"','"+this.sg1.cells(2,i)+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(6,i)+"' "+
									" ,'"+this.sg1.cells(8,i)+"','"+this.sg1.cells(11,i)+"','"+this.sg1.cells(12,i)+"','10',"+parseNilai(this.sg1.cells(15,i))+","+parseNilai(this.sg1.cells(16,i))+",'"+vTahun+"10"+"',"+parseNilai(this.sg1.cells(17,i))+",'"+vTahun+"',"+parseNilai(this.sg1.cells(10,i))+","+idx+",'F','0','"+this.sg1.cells(18,i).substr(0,1)+"')");
						} 
						else {
							if (this.sg1.cells(14,i).substr(0,1) == "B"){
								idx++;
								sql.add("insert into agg_abau_d(no_abau,kode_lokasi,kode_rka,kode_drk,kode_pk,kode_var,kode_akun,keterangan,kode_pp,bulan,jumlah,volume,periode,nilai,tahun,tarif,no_urut,posted,progress,jenis_agg)"+
										" values('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(4,i)+"','"+this.sg1.cells(2,i)+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(6,i)+"' "+
										" ,'"+this.sg1.cells(8,i)+"','"+this.sg1.cells(11,i)+"','"+this.sg1.cells(12,i)+"','01',"+parseNilai(this.sg1.cells(15,i))+","+parseNilai(this.sg1.cells(16,i))+",'"+vTahun+"01"+"',"+parseNilai(this.sg1.cells(17,i))+",'"+vTahun+"',"+parseNilai(this.sg1.cells(10,i))+","+idx+",'F','0','"+this.sg1.cells(18,i).substr(0,1)+"')");
								idx++;
								sql.add("insert into agg_abau_d(no_abau,kode_lokasi,kode_rka,kode_drk,kode_pk,kode_var,kode_akun,keterangan,kode_pp,bulan,jumlah,volume,periode,nilai,tahun,tarif,no_urut,posted,progress,jenis_agg)"+
										" values('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(4,i)+"','"+this.sg1.cells(2,i)+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(6,i)+"' "+
										" ,'"+this.sg1.cells(8,i)+"','"+this.sg1.cells(11,i)+"','"+this.sg1.cells(12,i)+"','07',"+parseNilai(this.sg1.cells(15,i))+","+parseNilai(this.sg1.cells(16,i))+",'"+vTahun+"07"+"',"+parseNilai(this.sg1.cells(17,i))+",'"+vTahun+"',"+parseNilai(this.sg1.cells(10,i))+","+idx+",'F','0','"+this.sg1.cells(18,i).substr(0,1)+"')");
							}
							else {
								if (this.sg1.cells(14,i).substr(0,1) == "C"){
									for (var j=1; j <= 12; j++){
										idx++;
										sql.add("insert into agg_abau_d(no_abau,kode_lokasi,kode_rka,kode_drk,kode_pk,kode_var,kode_akun,keterangan,kode_pp,bulan,jumlah,volume,periode,nilai,tahun,tarif,no_urut,posted,progress,jenis_agg)"+
												" values('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(4,i)+"','"+this.sg1.cells(2,i)+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(6,i)+"' "+
												" ,'"+this.sg1.cells(8,i)+"','"+this.sg1.cells(11,i)+"','"+this.sg1.cells(12,i)+"','"+(j<10?"0":"")+j+"',"+parseNilai(this.sg1.cells(15,i))+","+parseNilai(this.sg1.cells(16,i))+",'"+vTahun+(j<10?"0":"")+j+"',"+parseNilai(this.sg1.cells(17,i))+",'"+vTahun+"',"+parseNilai(this.sg1.cells(10,i))+","+idx+",'F','0','"+this.sg1.cells(18,i).substr(0,1)+"')");
									}
								}
								else {
									idx++;
									sql.add("insert into agg_abau_d(no_abau,kode_lokasi,kode_rka,kode_drk,kode_pk,kode_var,kode_akun,keterangan,kode_pp,bulan,jumlah,volume,periode,nilai,tahun,tarif,no_urut,posted,progress,jenis_agg)"+
											" values('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(4,i)+"','"+this.sg1.cells(2,i)+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(6,i)+"' "+
											" ,'"+this.sg1.cells(8,i)+"','"+this.sg1.cells(11,i)+"','"+this.sg1.cells(12,i)+"','"+this.sg1.cells(14,i)+"',"+parseNilai(this.sg1.cells(15,i))+","+parseNilai(this.sg1.cells(16,i))+",'"+vTahun+this.sg1.cells(14,i)+"',"+parseNilai(this.sg1.cells(17,i))+",'"+vTahun+"',"+parseNilai(this.sg1.cells(10,i))+","+idx+",'F','0','"+this.sg1.cells(18,i).substr(0,1)+"')");
								}
							}
						}
					}
				}			
				sql.add("insert into agg_d (kode_lokasi,kode_pk,kode_drk,kode_rka,kode_akun,kode_pp,periode,bulan,jumlah,volume,nilai,tahun,no_bukti,modul,progress,jenis_agg,keterangan) "+
						"       select a.kode_lokasi,a.kode_pk,a.kode_drk,a.kode_rka,a.kode_akun,a.kode_pp,a.periode,a.bulan,a.jumlah,a.volume,a.nilai,a.tahun,a.no_abau,'ABAU',a.progress,case when a.jenis_agg = 'L' then 'E' else 'T' end as jenis,a.keterangan "+
						"       from agg_abau_d a "+ //inner join agg_abau_m b on a.no_abau=b.no_abau and a.kode_lokasi=b.kode_lokasi and a.tahun=b.tahun
						"       where a.no_abau='"+this.ed_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ");				
				this.dbLib.execArraySQL(sql);
				break;
			case "hapus" : 
				if (!this.standarLib.checkEmptyByTag(this, new Array("0","2"))){
					return false;
				}
				if (this.prog != "0") {
					system.alert(this,"Transaksi tidak valid.","Transaksi Norma Variable telah di Close.");
					return false;
				} 
				var vTahun = this.eTahun.getText();
				var sql = new server_util_arrayList();
				
				sql.add("delete from agg_abau_m where no_abau = '"+this.ed_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
				sql.add("delete from agg_abau_dt where no_abau = '"+this.ed_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
				sql.add("delete from agg_abau_d where no_abau = '"+this.ed_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
				sql.add("delete from agg_d where modul = 'ABAU' and no_bukti = '"+this.ed_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
				
				this.dbLib.execArraySQL(sql);
				break;
		}
	},
	doCariClick: function(sender){
		var nemu = false;
		for (var i=0; i < this.sg1.rows.getLength(); i++){
			if (this.sg1.cells(4,i) == this.eCari.getText()) {
				this.sg1.goToRow(i);
				nemu = true;
				break;
			}
		}
	},
	doChange: function(sender){
		if (sender == this.eTahun || sender == this.ePP) {
			if (this.eTahun.getText()!="" && this.ePP.getText()!="") {
				this.ed_nb.setSQL("select no_abau, kode_pp from agg_abau_m where tahun = '"+this.eTahun.getText()+"' and kode_pp ='"+this.ePP.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ",["no_abau","kode_pp"],false,["No Bukti","Kode PP"],"and","Data Anggaran Norma Biaya Variable",true);				
			}			
			var data = this.dbLib.getDataProvider("select progress from agg_close where kode_lokasi = '"+this.app._lokasi+"' and modul = 'ABAU' and tahun = '"+this.eTahun.getText()+"'",true);
			if (typeof data == "object"){
				this.prog = data.rs.rows[0].progress;
			}
			if (this.ePP.getText()!="") {
				this.kodeBidang = this.ePP.dataFromList[2];
				var data2 = this.dbLib.getDataProvider("select progress from agg_app where kode_lokasi = '"+this.app._lokasi+"' and modul = 'ABAU' and tahun = '"+this.eTahun.getText()+"' and kode_bidang='"+this.kodeBidang+"' ",true);
				if (typeof data2 == "object"){
					this.progApp = data2.rs.rows[0].progress;
				}
			}				
		}
	},
	doLoadData: function(sender){
		if (sender ==this.ed_nb && this.ed_nb.getText()!= "") {
			var data = this.dbLib.getDataProvider(
					   "select z.kode_pp as kodepp, yy.nama as namapp,case z.jenis when 'L' then 'LAMA' else 'BARU' end as jenis, "+
					   "	   b.kode_rka,d.nama as nama_rka,b.kode_drk,e.nama as nama_drk,x.kode_pk,x.nama as nama_pk,b.kode_var,f.nama as nama_var,"+
					   "       b.kode_akun,g.nama as nama_akun,b.kode_pp,xx.nama as nama_pp,b.jns_periode,b.jumlah,b.volume,fff.tarif,round(b.jumlah*b.volume*fff.tarif,0) nilai,b.keterangan,case b.jenis_agg when 'L' then 'LAMA' else 'BARU' end as jenis_agg "+
					   "from agg_abau_dt b inner join agg_abau_m z on z.no_abau=b.no_abau and b.tahun=z.tahun and z.kode_lokasi=b.kode_lokasi "+
					   "     inner join agg_rka d on b.kode_rka=d.kode_rka and b.tahun=d.tahun "+
					   "     inner join agg_drk e on d.kode_drk=e.kode_drk and d.tahun=e.tahun "+
					   "     inner join agg_pk x on e.kode_pk=x.kode_pk and x.tahun=e.tahun "+
					   "     inner join agg_var f on b.kode_var=f.kode_var "+
					   "     inner join agg_norma_var fff on b.kode_var=fff.kode_var and fff.tahun = b.tahun "+
					   "     inner join agg_masakun g on b.kode_akun=g.kode_akun and g.kode_lokasi='"+this.app._lokasi+"' "+
					   "     inner join agg_pp xx on b.kode_pp=xx.kode_pp and xx.kode_lokasi=b.kode_lokasi "+
					   "     inner join agg_pp yy on z.kode_pp=yy.kode_pp and z.kode_lokasi=yy.kode_lokasi "+
					   " where b.no_abau = '"+this.ed_nb.getText()+"' and b.tahun = '"+this.eTahun.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"' order by b.kode_rka,b.kode_var,b.jns_periode");
			eval("data = "+data+";");				
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg1.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg1.appendData([ line.kode_pk,line.nama_pk,line.kode_drk,line.nama_drk,line.kode_rka,line.nama_rka,
									     line.kode_var,line.nama_var,line.kode_akun,line.nama_akun,floatToNilai(line.tarif),  
										 line.keterangan,
										 line.kode_pp,line.nama_pp,
										 line.jns_periode,floatToNilai(line.jumlah),floatToNilai(line.volume),floatToNilai(line.nilai),line.jenis_agg.toUpperCase()]);
				}
				this.ePP.setText(line.kodepp,line.namapp);
				this.cJenis.setText(line.jenis.toUpperCase());
			} else this.sg1.clear(1);
			this.doHitung();
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
						var vTot = Math.round(nilaiToFloat(this.sg1.cells(10,row)) * nilaiToFloat(this.sg1.cells(15,row)) * nilaiToFloat(this.sg1.cells(16,row)));
						this.sg1.cells(17,row,vTot);
					}
			break;
		}		
	},
	doHitung: function(sender){
		var vjml=tot=tot1 = 0;			
		for (var i = 0;i < this.sg1.getRowCount();i++){
			if (this.sg1.cells(10,i) != "" && this.sg1.cells(15,i) != "" && this.sg1.cells(16,i) != "") {
				vJml = 1;
				if (this.sg1.cells(14,i).substr(0,1) == "A") vJml = 4;
				if (this.sg1.cells(14,i).substr(0,1) == "B") vJml = 2;
				if (this.sg1.cells(14,i).substr(0,1) == "C") vJml = 1;
				
				tot = Math.round(nilaiToFloat(this.sg1.cells(10,i)) * nilaiToFloat(this.sg1.cells(15,i)) * nilaiToFloat(this.sg1.cells(16,i)));
				this.sg1.cells(17,i,tot);
				tot = vJml * tot;
				tot1 += tot;
			}
		}
		this.eTotal.setText(floatToNilai(tot1));
	},	
	doEllipsClick: function(sender, col, row) {
		try
		{
			switch(col){
				case 4 :
						this.standarLib.showListDataForSG(this, "Daftar RKA",this.sg1, this.sg1.row, this.sg1.col, 
														"select a.kode_rka,a.nama,b.kode_drk,b.nama as nama_drk   from agg_rka a inner join agg_drk b on a.kode_drk=b.kode_drk and a.tahun=b.tahun where a.tahun = '"+this.eTahun.getText()+"' and a.tf_aktif='1' ",
														"select count(a.kode_rka) from agg_rka a inner join agg_drk b on a.kode_drk=b.kode_drk and a.tahun=b.tahun where a.tahun = '"+this.eTahun.getText()+"' and a.tf_aktif='1' ",
														 new Array("a.kode_rka","a.nama","b.kode_drk","b.nama"),"and",new Array("Kode RKA","Nama RKA","Kode DRK","Nama DRK"),false);					
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
														"select a.kode_var,a.nama,b.tarif,b.kode_akun from agg_var a inner join agg_norma_var b on a.kode_var=b.kode_var where b.tahun = '"+this.eTahun.getText()+"'",
														"select count(a.kode_var) from agg_var a inner join agg_norma_var b on a.kode_var=b.kode_var where b.tahun = '"+this.eTahun.getText()+"'",
														 new Array("a.kode_var","a.nama","b.tarif","b.kode_akun"),"and",new Array("Kode","Nama","Tarif","Kode Akun"),false);					
						}
						else {
							this.standarLib.showListDataForSG(this, "Daftar Variable Biaya",this.sg1, this.sg1.row, this.sg1.col, 
														"select a.kode_var,a.nama,b.tarif,b.kode_akun from agg_var a inner join agg_norma_var b on a.kode_var=b.kode_var and b.tahun='"+this.eTahun.getText()+"' inner join agg_abau_kamus c on b.kode_var=c.kode_var and c.tahun=b.tahun where c.kode_rka = '"+this.sg1.cells(4,row)+"' and b.tahun = '"+this.eTahun.getText()+"'",
														"select count(a.kode_var) from agg_var a inner join agg_norma_var b on a.kode_var=b.kode_var and b.tahun='"+this.eTahun.getText()+"' inner join agg_abau_kamus c on b.kode_var=c.kode_var and c.tahun=b.tahun where c.kode_rka = '"+this.sg1.cells(4,row)+"' and b.tahun = '"+this.eTahun.getText()+"'",
														 new Array("a.kode_var","a.nama","b.tarif","b.kode_akun"),"and",new Array("Kode","Nama","Tarif","Kode Akun"),false);
						
						}
						break;								  
				case 12 : 
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
