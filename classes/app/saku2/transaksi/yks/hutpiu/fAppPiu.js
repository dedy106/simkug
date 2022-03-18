window.app_saku2_transaksi_yks_hutpiu_fAppPiu = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_yks_hutpiu_fAppPiu.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_yks_hutpiu_fAppPiu";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Approve BAST Piutang: Input", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;pageControl;saiGrid;sgNavigator;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_dok = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"No Dokumen", maxLength:50});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,14,450,20],caption:"Keterangan", maxLength:150});				
		this.cb_tujuan = new saiCBBL(this,{bound:[20,16,200,20],caption:"Lokasi Tujuan", multiSelection:false, maxLength:10, tag:2});		
		this.cb_buat = new saiCBBL(this,{bound:[20,15,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});
		this.c_jenis = new saiCB(this,{bound:[20,22,202,20],caption:"Jenis",items:["PEGAWAI","PENSIUN","GROUP","MITRA"], readOnly:true,tag:2});
		this.c_sort = new saiCB(this,{bound:[242,22,202,20],caption:"Sort By",items:["HR","NOPIUTANG"], readOnly:true,tag:2});
		this.c_status = new saiCB(this,{bound:[460,22,180,20],caption:"Status Data",items:["AKUMULASI","CURRENT"], readOnly:true,tag:2});
		this.e_nilai = new saiLabelEdit(this,{bound:[780,22,200,20],caption:"Nilai", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.bTampil = new button(this,{bound:[665,22,80,18],caption:"Tampil Data",click:[this,"doLoad"]});			
		this.i_appAll = new portalui_imageButton(this,{bound:[750,22,20,20],hint:"Approve All",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		
		this.pc1 = new pageControl(this,{bound:[20,20,960,300], childPage:["Data Piutang","Detail Billing"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:7,tag:9,
				colTitle:["Status","No Piutang","Loker","Tanggal","Keterangan","Jenis","Nilai"],
				colWidth:[[6,5,4,3,2,1,0],[100,60,300,80,70,150,80]],
				columnReadOnly:[true,[0,1,2,3,4,5,6],[]],
				colFormat:[[6],[cfNilai]],
				picklist:[[0],[new portalui_arrayMap({items:["APP","INPROG"]})]],checkItem:true,
				nilaiChange:[this,"doNilaiChange"],change:[this,"doChangeCell"],dblClick:[this,"doDoubleClick"],buttonStyle:[[0],[bsAuto]],defaultRow:1,autoAppend:false});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg});
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.childPage[1].width-5,this.pc1.childPage[1].height-35],colCount:17,tag:9,
				colTitle:["Kode Mitra","No Ref","NIK","Nama","Loker Valid","Loker BAST","Area Host","Band","NIKKES","Nama Pasien","Tgl Masuk","Tgl Keluar","ICD-X","Kode Biaya","Nilai","Nilai Kunj","Nilai CS"],
				colWidth:[[16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[80,80,100,70,70,70,70,100,70,70,70,100,100,100,70,100,70]],
				colFormat:[[14,15,16],[cfNilai,cfNilai,cfNilai]],
				readOnly:true, defaultRow:1
		});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.childPage[1].height-25,this.pc1.childPage[1].width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager"]});				
		
		this.rearrangeChild(10, 23);
		setTipeButton(tbSimpan);		
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);			
			this.cb_tujuan.setSQL("select kode_lokasi, nama from lokasi where kode_lokasi in ('99','"+this.app._lokasi+"') ",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi Tujuan",true);
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='JUAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");		
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_yks_hutpiu_fAppPiu.extend(window.childForm);
window.app_saku2_transaksi_yks_hutpiu_fAppPiu.implement({
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");	
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
	},
	simpan: function(){			
		try{						
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"yk_valid_m","no_valid",this.app._lokasi+"-APIU"+this.e_periode.getText().substr(2,4)+".","000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();										
					if (this.c_jenis.getText() == "PEGAWAI") {
						sql.add("insert into yk_valid_m(no_valid,kode_lokasi,no_load,periode,tanggal,no_dokumen,keterangan,nik_buat,nik_app,tgl_input,nik_user,modul,progress,posted) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_tujuan.getText()+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"',getdate(),'"+this.app._userLog+"','APPBAST','0','X')");						
						
						if (this.sg.getRowValidCount() > 0){
							for (var i=0;i < this.sg.getRowCount();i++){
								if (this.sg.rowValid(i) && this.sg.cells(0,i)=="APP"){																
									sql.add("update a set a.no_selesai='"+this.e_nb.getText()+"' "+
											"from yk_bill_d a inner join cust b on a.loker_bast=b.kode_cust "+
											"where b.jenis<>'PENSIUN' and a.no_piutang = '"+this.sg.cells(1,i)+"' and a.loker_bast='"+this.sg.cells(2,i)+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.no_selesai='-' and a.flag_aktif ='1'");
									sql.add("update a set a.no_selesai='"+this.e_nb.getText()+"' "+
											"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
											"where b.jenis<>'PENSIUN' and a.no_piutang = '"+this.sg.cells(1,i)+"' and a.loker_bast='"+this.sg.cells(2,i)+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.no_selesai='-' and a.flag_aktif ='1'");																
								}
							}
						}
					}
					if (this.c_jenis.getText() == "PENSIUN") {
						sql.add("insert into yk_valid_m(no_valid,kode_lokasi,no_load,periode,tanggal,no_dokumen,keterangan,nik_buat,nik_app,tgl_input,nik_user,modul,progress,posted) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"',getdate(),'"+this.app._userLog+"','APPPENS','0','X')");						
						
						if (this.sg.getRowValidCount() > 0){
							for (var i=0;i < this.sg.getRowCount();i++){
								if (this.sg.rowValid(i) && this.sg.cells(0,i)=="APP"){																
									sql.add("update a set a.no_selesai='"+this.e_nb.getText()+"' "+
											"from yk_bill_d a inner join cust b on a.loker_bast=b.kode_cust "+
											"where b.jenis='PENSIUN' and a.no_piutang = '"+this.sg.cells(1,i)+"' and a.loker_bast='"+this.sg.cells(2,i)+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.no_selesai='-' and a.flag_aktif ='1'");
									sql.add("update a set a.no_selesai='"+this.e_nb.getText()+"' "+
											"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
											"where b.jenis='PENSIUN' and a.no_piutang = '"+this.sg.cells(1,i)+"' and a.loker_bast='"+this.sg.cells(2,i)+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.no_selesai='-' and a.flag_aktif ='1'");																
								}
							}
						}
					}
					if (this.c_jenis.getText() == "GROUP" || this.c_jenis.getText() == "MITRA") {
						sql.add("insert into yk_valid_m(no_valid,kode_lokasi,no_load,periode,tanggal,no_dokumen,keterangan,nik_buat,nik_app,tgl_input,nik_user,modul,progress,posted) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"',getdate(),'"+this.app._userLog+"','APP"+this.c_jenis.getText()+"','0','X')");						
						
						if (this.sg.getRowValidCount() > 0){
							for (var i=0;i < this.sg.getRowCount();i++){
								if (this.sg.rowValid(i) && this.sg.cells(0,i)=="APP"){
									sql.add("update a set a.no_selesai='"+this.e_nb.getText()+"' "+
											"from yk_bill_d a inner join cust b on a.loker_bast=b.kode_cust "+
											"where b.jenis ='"+this.c_jenis.getText()+"' and a.no_piutang = '"+this.sg.cells(1,i)+"' and a.loker_bast='"+this.sg.cells(2,i)+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.no_selesai='-' and a.flag_aktif ='1'");
									sql.add("update a set a.no_selesai='"+this.e_nb.getText()+"' "+
											"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
											"where b.jenis ='"+this.c_jenis.getText()+"' and a.no_piutang = '"+this.sg.cells(1,i)+"' and a.loker_bast='"+this.sg.cells(2,i)+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.no_selesai='-' and a.flag_aktif ='1'");																
								}
							}
						}
					}
					setTipeButton(tbAllFalse);					
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg.clear(1);
					this.sg1.clear(1);
					setTipeButton(tbSimpan);					
				break;
			case "simpan" :	
				/*
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);				
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())){
					if (this.app._pernext == "1")
					  system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
					else{
						system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
						return false;
					}
				} 				
				else 
				*/
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}
		this.e_nb.setText("");
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"yk_valid_m","no_valid",this.app._lokasi+"-APIU"+this.e_periode.getText().substr(2,4)+".","000"));
			this.e_dok.setFocus();
		}
		if (sender == this.i_appAll) {
			for (var i=0;i < this.sg.getRowCount();i++){
				if (this.sg.rowValid(i)) 
					this.sg.cells(0,i,"APP");
			}
			this.sg.validasi();
		}
	},
	doLoad:function(sender){	
		if (this.e_periode.getText() != "") {
			if (this.c_status.getText() == "AKUMULASI") vOperan = " <= "; else vOperan = " = ";
			this.sg1.clear(1); 			
			if (this.c_sort.getText()=="HR") var vSort = "order by a.loker_bast ";
			else var vSort = "order by a.no_hutang ";
			
			if (this.c_jenis.getText()=="GROUP" || this.c_jenis.getText()=="MITRA") var vLokasi = " and c.kode_lokasi="+this.app._lokasi+" ";
			else var vLokasi = "  ";
			var data = this.dbLib.getDataProvider(
			           "select a.no_hutang,a.loker_bast,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.modul,sum(a.nilai) as nilai "+
					   "from ( "+
					   
					   "select a.no_valid as no_hutang,b.loker_bast,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.modul,sum(b.nilai) as nilai "+
					   "from yk_valid_m a inner join yk_bill_d b on a.no_valid=b.no_piutang and a.kode_lokasi=b.kode_lokasi "+					   
					   "                  inner join cust c on b.loker_bast=c.kode_cust "+vLokasi+
			           "where substring(a.periode,1,4)>='2012' and b.no_selesai = '-' and c.jenis = '"+this.c_jenis.getText()+"' and a.periode "+vOperan+" '"+this.e_periode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.modul in ('BAREV','TAKTERIMA') and b.flag_aktif ='1' "+ 
					   "group by a.no_valid,b.loker_bast,convert(varchar,a.tanggal,103),a.keterangan,a.modul "+
					   "union all "+
					   "select a.no_valid as no_hutang,b.loker_bast,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.modul,case when c.jenis = 'PENSIUN' then 0 else sum(b.umum+b.gigi+b.kbia+b.matkes-b.cs) end as nilai "+
					   "from yk_valid_m a inner join yk_billkunj_d b on a.no_valid=b.no_piutang and a.kode_lokasi=b.kode_lokasi "+					   
					   "                   inner join cust c on b.loker_bast=c.kode_cust "+vLokasi+
			           "where substring(a.periode,1,4)>='2012' and b.no_selesai = '-' and c.jenis = '"+this.c_jenis.getText()+"' and a.periode "+vOperan+" '"+this.e_periode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.modul in ('BAREV','TAKTERIMA') and b.flag_aktif ='1' "+ 
					   "group by a.no_valid,b.loker_bast,convert(varchar,a.tanggal,103),a.keterangan,a.modul,c.jenis "+					   
					   
					   "union all "+
					     
					   "select a.no_hutang,b.loker_bast,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.modul,sum(b.nilai) as nilai "+
					   "from yk_hutang_m a inner join yk_bill_d b on a.no_hutang=b.no_piutang and a.kode_lokasi=b.kode_lokasi "+
					   "                   inner join yk_bill_m x on b.no_bill=x.no_bill and x.kode_lokasi=b.kode_lokasi "+
					   "                   inner join cust c on b.loker_bast=c.kode_cust "+vLokasi+
			           "where x.no_load='2012' and b.flag_aktif ='1' and b.no_selesai = '-' and c.jenis = '"+this.c_jenis.getText()+"' and a.periode "+vOperan+" '"+this.e_periode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.modul = 'HUTKES' "+
					   "group by a.no_hutang,b.loker_bast,convert(varchar,a.tanggal,103),a.keterangan,a.modul "+
					   "union all "+
					   "select a.no_hutang,b.loker_bast,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.modul,case when c.jenis = 'PENSIUN' then 0 else sum(b.umum+b.gigi+b.kbia+b.matkes-b.cs) end as nilai "+
					   "from yk_hutang_m a inner join yk_billkunj_d b on a.no_hutang=b.no_piutang and a.kode_lokasi=b.kode_lokasi "+
					   "                   inner join yk_billkunj_m x on b.no_bill=x.no_bill and x.kode_lokasi=b.kode_lokasi "+
					   "                   inner join cust c on b.loker_bast=c.kode_cust "+vLokasi+
			           "where x.no_load='2012' and b.flag_aktif ='1' and b.no_selesai = '-' and c.jenis = '"+this.c_jenis.getText()+"' and a.periode "+vOperan+" '"+this.e_periode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.modul in ('HUTKES','PDPT','PDPTREV') "+
					   "group by a.no_hutang,b.loker_bast,convert(varchar,a.tanggal,103),a.keterangan,a.modul,c.jenis "+					   
					   
					   "union all "+
					   
					   "select a.no_kas,b.loker_bast,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.modul,sum(b.nilai) as nilai "+
					   "from kas_m a inner join yk_bill_d b on a.no_kas=b.no_piutang and a.kode_lokasi=b.kode_lokasi "+
					   "             inner join yk_bill_m x on b.no_bill=x.no_bill and x.kode_lokasi=b.kode_lokasi "+
					   "             inner join cust c on b.loker_bast=c.kode_cust "+vLokasi+
			           "where x.no_load='2012' and b.flag_aktif ='1' and b.no_selesai = '-' and c.jenis = '"+this.c_jenis.getText()+"' and a.periode "+vOperan+" '"+this.e_periode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.modul = 'KBRES' "+
					   "group by a.no_kas,b.loker_bast,convert(varchar,a.tanggal,103),a.keterangan,a.modul "+
					   "union all "+
					   "select a.no_kas,b.loker_bast,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.modul,case when c.jenis = 'PENSIUN' then 0 else sum(b.umum+b.gigi+b.kbia+b.matkes-b.cs) end as nilai "+
					   "from kas_m a inner join yk_billkunj_d b on a.no_kas=b.no_piutang and a.kode_lokasi=b.kode_lokasi "+
					   "             inner join yk_billkunj_m x on b.no_bill=x.no_bill and x.kode_lokasi=b.kode_lokasi "+
					   "             inner join cust c on b.loker_bast=c.kode_cust "+vLokasi+
			           "where x.no_load='2012' and b.flag_aktif ='1' and b.no_selesai = '-' and c.jenis = '"+this.c_jenis.getText()+"' and a.periode "+vOperan+" '"+this.e_periode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.modul = 'KBRES' "+
					   "group by a.no_kas,b.loker_bast,convert(varchar,a.tanggal,103),a.keterangan,a.modul,c.jenis "+					   
					   
					   "union all "+
					   
					   "select a.no_ju,b.loker_bast,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.modul,sum(b.nilai) as nilai "+
					   "from ju_m a inner join yk_bill_d b on a.no_ju=b.no_piutang and a.kode_lokasi=b.kode_lokasi "+
					   "            inner join yk_bill_m x on b.no_bill=x.no_bill and x.kode_lokasi=b.kode_lokasi "+
					   "            inner join cust c on b.loker_bast=c.kode_cust "+vLokasi+
			           "where x.no_load='2012' and b.flag_aktif ='1' and b.no_selesai = '-' and c.jenis = '"+this.c_jenis.getText()+"' and a.periode "+vOperan+" '"+this.e_periode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.modul = 'JU' and a.jenis='KAPITASI' "+
					   "group by a.no_ju,b.loker_bast,convert(varchar,a.tanggal,103),a.keterangan,a.modul "+
					   "union all "+
					   "select a.no_ju,b.loker_bast,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.modul,case when c.jenis = 'PENSIUN' then 0 else sum(b.umum+b.gigi+b.kbia+b.matkes-b.cs) end as nilai "+
					   "from ju_m a inner join yk_billkunj_d b on a.no_ju=b.no_piutang and a.kode_lokasi=b.kode_lokasi "+
					   "            inner join yk_billkunj_m x on b.no_bill=x.no_bill and x.kode_lokasi=b.kode_lokasi "+
					   "            inner join cust c on b.loker_bast=c.kode_cust "+vLokasi+
			           "where x.no_load='2012' and b.flag_aktif ='1' and b.no_selesai = '-' and c.jenis = '"+this.c_jenis.getText()+"' and a.periode "+vOperan+" '"+this.e_periode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.modul = 'JU' and a.jenis='KAPITASI' "+
					   "group by a.no_ju,b.loker_bast,convert(varchar,a.tanggal,103),a.keterangan,a.modul,c.jenis "+					   
					   
					   ") a where a.nilai <> 0 group by a.no_hutang,a.loker_bast,convert(varchar,a.tanggal,103),a.keterangan,a.modul "+
					   " "+vSort,true);
						  
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData(["INPROG",line.no_hutang,line.loker_bast,line.tanggal,line.keterangan,line.modul,floatToNilai(line.nilai)]);
				}
			} else this.sg.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[0]);
		}
		else {
			system.alert(this,"Data tidak valid.","Periode harus diisi.");
		}
	},	
	doDoubleClick: function(sender, col , row) {
		//hanya yg piutang pegawai loker setempat
		if (this.sg.cells(1,row) != "") {
			var strSQL = "select a.kode_vendor,a.no_ref,a.nik,a.nama,a.loker_valid,a.loker_bast,b.kode_lokasi,a.band,a.nikkes,a.pasien,convert(varchar,a.tgl_masuk,103) as tgl_masuk,convert(varchar,a.tgl_keluar,103) as tgl_keluar,a.icdx,a.kode_produk,a.nilai,a.nilai_kunj,a.nilai_cs "+
			             "from yk_bill_d a inner join cust b on a.loker_bast=b.kode_cust "+
						 "where a.flag_aktif ='1' and b.jenis <> 'PENSIUN' and a.loker_bast = '"+this.sg.cells(2,row)+"' and a.no_piutang = '"+this.sg.cells(1,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' ";			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[1]);
		} else system.alert(this,"Data tidak valid.","HR Peserta harus diisi.");
	},	
	doTampilData: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];									
			this.sg1.appendData([line.kode_vendor,line.no_ref,line.nik,line.nama,line.loker_valid,line.loker_bast,line.kode_lokasi,line.band,line.nikkes,line.pasien,line.tgl_masuk,line.tgl_keluar,line.icdx,line.kode_produk,floatToNilai(line.nilai),floatToNilai(line.nilai_kunj),floatToNilai(line.nilai_cs)]);
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doChangeCell: function(sender, col, row){
		if (col == 0) {
			this.sg.validasi();
		}
	},
	doNilaiChange: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(6,i) != "" && this.sg.cells(0,i) == "APP"){
					if (this.sg.cells(5,i) == "TAKTERIMA" || this.sg.cells(5,i) == "JU" || this.sg.cells(5,i) == "BAST" || this.sg.cells(5,i) == "HUTKES" || this.sg.cells(5,i) == "PDPT" || this.sg.cells(5,i) == "KBRES" || this.sg.cells(5,i) == "BAREV") tot += nilaiToFloat(this.sg.cells(6,i));
					if (this.sg.cells(5,i) == "PDPTREV") tot -= nilaiToFloat(this.sg.cells(6,i));
				}
			}
			this.e_nilai.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.e_nb.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});