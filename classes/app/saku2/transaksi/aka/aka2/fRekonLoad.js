window.app_saku2_transaksi_aka_aka2_fRekonLoad = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_aka_aka2_fRekonLoad.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_aka_aka2_fRekonLoad";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Load Rekonsiliasi Pelunasan Tagihan per NIM", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;pageControl;portalui_saiMemo");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				
		this.c_status = new saiCB(this,{bound:[820,17,202,20],caption:"Status Rekon",items:["LOAD"], readOnly:true,tag:8,visible:false});
		this.cb_titip = new saiCBBL(this,{bound:[20,18,220,20],caption:"Akun Pelunasan", multiSelection:false, maxLength:10, tag:2 });
		this.e_piutang = new saiLabelEdit(this,{bound:[820,18,200,20],caption:"Total Tagihan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});								
		this.cb_buat = new saiCBBL(this,{bound:[20,16,220,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2 });
		this.e_bea = new saiLabelEdit(this,{bound:[820,16,200,20],caption:"Rekon Beasiswa", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.cb_app = new saiCBBL(this,{bound:[20,18,220,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});				
		this.e_nilai = new saiLabelEdit(this,{bound:[820,18,200,20],caption:"Rekon PDD", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.bLoadBea = new button(this,{bound:[580,18,100,20],caption:"Load Beasiswa", click:[this,"doLoadBea"]});
		this.bRekon = new button(this,{bound:[700,18,100,20],caption:"Rekon", click:[this,"doRekon"]});
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,320], childPage:["Filter","Data Tagihan","Pelunasan Bea","Pelunasan PDD"]});
		this.cb_fak = new saiCBBL(this.pc1.childPage[0],{bound:[20,16,220,20],caption:"Fakultas", multiSelection:false, maxLength:10, tag:2 });
		this.c_jenis = new saiCB(this.pc1.childPage[0],{bound:[20,13,200,20],caption:"Jenis",items:["PERIOD","ALL"], readOnly:true,tag:2}); 		
		this.c_periode2 = new saiCB(this.pc1.childPage[0],{bound:[20,22,200,20],caption:"By Periode",readOnly:true,tag:2});				
		this.bTampil = new button(this.pc1.childPage[0],{bound:[240,22,80,20],caption:"Data Tagihan", click:[this,"doLoad"]});
		
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:11,tag:0,
		            colTitle:["NIM","Nama","No Invoice","Periode","Kode Produk","Nama Produk","Akun Piutang","Saldo Tagihan","Nilai Pelunasan","ID Bank","Kode PP"],
								colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[60,60,100,100,70,100,80,80,150,150,80]],
								colFormat:[[7,8],[cfNilai,cfNilai]],
								columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9,10],[]], autoPaging:true, rowPerPage:20,
								nilaiChange:[this,"doNilaiChange"],					
								autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});	
		
		this.sg2 = new portalui_saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:4,
								colTitle:["NIM","Nilai Beasiswa","Nilai Rekon","No Invoice"],
								colWidth:[[3,2,1,0],[120,100,100,100]],
								colFormat:[[1,2],[cfNilai,cfNilai]],autoPaging:true, rowPerPage:20,
								autoAppend:false,readOnly:true, defaultRow:1
								});		
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll, grid:this.sg2, pager:[this,"doPager2"]});		
		
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:4,
								colTitle:["NIM","Nilai Bayar","ID Bank","Nilai Rekon"],
								colWidth:[[3,2,1,0],[100,100,100,100]],
								colFormat:[[1,3],[cfNilai,cfNilai]],
								pasteEnable:true,autoPaging:true,rowPerPage:20,afterPaste:[this,"doAfterPaste"], 
								readOnly:true, defaultRow:1
								});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[3],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll, grid:this.sg1, pager:[this,"doPager1"]});		
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);	
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_titip.setSQL("select kode_akun, nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Daftar Akun Pelunasan",true);			
			this.cb_buat.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);
			this.cb_app.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);
			this.cb_fak.setSQL("select kode_fakultas, nama from aka_fakultas where kode_lokasi='"+this.app._lokasi+"'",["kode_fakultas","nama"],false,["Kode","Nama"],"and","Daftar Fakultas",true);			
			
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join masakun b on a.flag=b.kode_akun and a.kode_lokasi=b.kode_lokasi where kode_spro='KBTTP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_titip.setText(line.flag,line.nama);
			} else this.cb_titip.setText("","");									
			
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");
			
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='ARAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");
			
			this.c_periode2.items.clear();
			var data = this.dbLib.getDataProvider("select distinct periode as periode from aka_bill_m where kode_lokasi='"+this.app._lokasi+"' order by periode desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_periode2.addItem(i,line.periode);
				}
			}					
			uses("server_report_report;portalui_reportViewer");
			this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
			this.viewer.hide();
			this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
			this.report = new server_report_report();
			this.report.addListener(this);
			
			this.c_status.setText("LOAD");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_aka_aka2_fRekonLoad.extend(window.childForm);
window.app_saku2_transaksi_aka_aka2_fRekonLoad.implement({		
	doLoadBea : function(sender){				
		if (this.cb_fak.getText() != "") {
			var strSQL = "select a.no_inv,a.nim,sum(a.nilai-a.pakai) as bea from aka_bill_bea a "+
						 "inner join aka_mahasiswa c on a.nim=c.nim and a.kode_lokasi=c.kode_lokasi "+
						 "inner join aka_jurusan b on c.kode_jur=b.kode_jur and c.kode_lokasi=b.kode_lokasi "+
						 "where b.kode_fakultas='"+this.cb_fak.getText()+"' and a.no_rekon='-' and a.kode_lokasi='"+this.app._lokasi+"' group by a.nim,a.no_inv";				
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU2 = data;
				this.sgn2.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn2.rearrange();
				for (var i=0;i<data.rs.rows.length;i++){
					line = this.dataJU2.rs.rows[i];							
					this.sg2.appendData([line.nim,floatToNilai(line.bea),"0",line.no_inv]);
				}				
			} else this.sg2.clear(1);			
			
			this.pc1.setActivePage(this.pc1.childPage[2]);			
		}
	},
	doTampilData2: function(page) {
		this.sg2.doSelectPage(page);		
	},
	doPager2: function(sender, page) {
		this.doTampilData2(page);
	},	
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn1.setTotalPage(sender.getTotalPage());
			this.sgn1.rearrange();										
		} catch(e) {alert(e);}
	},
	doPager1: function(sender,page){
		this.sg1.doSelectPage(page);
	},	
	doRekon:	function(sender){				
		try {
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				this.dataJU.rs.rows[i].lunas=0;
			}													
			totBea = 0;
			for (var i=0; i < this.sg2.getRowCount();i++){
				var terpakai = 0;
				var nilaiAwal = nilaiToFloat(this.sg2.cells(1,i));	
				var nilaiBayar = nilaiToFloat(this.sg2.cells(1,i));					
				this.sg2.cells(2,i,"0");	
				
				for (var j=0;j < this.dataJU.rs.rows.length;j++){
					if (nilaiBayar > 0) {
						if (this.sg2.cells(0,i) == this.dataJU.rs.rows[j].nim && this.sg2.cells(3,i) == this.dataJU.rs.rows[j].no_inv) {
							if (nilaiBayar >= (parseFloat(this.dataJU.rs.rows[j].saldo)-parseFloat(this.dataJU.rs.rows[j].lunas))) {
								nilaiBayar = nilaiBayar - (parseFloat(this.dataJU.rs.rows[j].saldo)-parseFloat(this.dataJU.rs.rows[j].lunas));
								this.dataJU.rs.rows[j].lunas += (parseFloat(this.dataJU.rs.rows[j].saldo)-parseFloat(this.dataJU.rs.rows[j].lunas));								
								this.dataJU.rs.rows[j].id_bank = "BEA";
							}
							else {							
								this.dataJU.rs.rows[j].lunas += nilaiBayar;							
								nilaiBayar = 0;								
								this.dataJU.rs.rows[j].id_bank = "BEA";
								this.sg.cells(8,j,floatToNilai(this.dataJU.rs.rows[j].lunas));
								break;
							}							
							this.sg.cells(8,j,floatToNilai(this.dataJU.rs.rows[j].lunas));
						}
					}
				}								
				terpakai = nilaiAwal - nilaiBayar;
				totBea += terpakai;
				this.sg2.cells(2,i,floatToNilai(terpakai));
			}			
			this.e_bea.setText(floatToNilai(totBea));				
			
			
			//colTitle:["NIM","Nilai Bayar","ID Bank","Nilai Rekon"],
			//colTitle:["NIM","Nilai Beasiswa","Nilai Rekon","No Invoice"],
			//nonBea diambil dari copy-paste dikurango bea
			
			for (var i=0; i < this.sg1.getRowCount();i++){				
				var nonBea = 0;
				for (var j=0; j < this.sg2.getRowCount();j++){										
					if (this.sg1.cells(0,i) == this.sg2.cells(0,j)) {
						nonBea = nilaiToFloat(this.sg1.cells(1,i)) - nilaiToFloat(this.sg2.cells(2,j));
						this.sg1.cells(1,i,floatToNilai(nonBea));
					}
				}
			}
			
			
			var totPdd = 0;
			for (var i=0; i < this.sg1.getRowCount();i++){
				var terpakai = 0;
				var nilaiAwal = nilaiToFloat(this.sg1.cells(1,i));				
				var nilaiBayar = nilaiToFloat(this.sg1.cells(1,i));					
				
				this.sg1.cells(3,i,"0");	
				for (var j=0;j < this.dataJU.rs.rows.length;j++){
					if (nilaiBayar > 0) {
						if (this.sg1.cells(0,i) == this.dataJU.rs.rows[j].nim) {						
							if (nilaiBayar >= (parseFloat(this.dataJU.rs.rows[j].saldo)-parseFloat(this.dataJU.rs.rows[j].lunas))) {
								nilaiBayar = nilaiBayar - (parseFloat(this.dataJU.rs.rows[j].saldo)-parseFloat(this.dataJU.rs.rows[j].lunas));
								this.dataJU.rs.rows[j].lunas += (parseFloat(this.dataJU.rs.rows[j].saldo)-parseFloat(this.dataJU.rs.rows[j].lunas));
								
								this.dataJU.rs.rows[j].id_bank = this.sg1.cells(2,i);
							}
							else {							
								this.dataJU.rs.rows[j].lunas += nilaiBayar;							
								nilaiBayar = 0;								
								this.dataJU.rs.rows[j].id_bank = this.sg1.cells(2,i);
								this.sg.cells(8,j,floatToNilai(this.dataJU.rs.rows[j].lunas));
								break;
							}
							this.sg.cells(8,j,floatToNilai(this.dataJU.rs.rows[j].lunas));
						}
					}
				}								
				terpakai = nilaiAwal - nilaiBayar;
				totPdd += terpakai;
				this.sg1.cells(3,i,floatToNilai(terpakai))				
			}
			this.e_nilai.setText(floatToNilai(totPdd));				
			
			this.pc1.setActivePage(this.pc1.childPage[1]);			
			this.doTampilData(1);			
		}
		catch(e) {
			alert(e);
		}
	},		
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"aka_rekon_m","no_rekon",this.app._lokasi+"-REK"+this.e_periode.getText().substr(2,4)+".","0000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{													
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					var totLunas = nilaiToFloat(this.e_nilai.getText()) + nilaiToFloat(this.e_bea.getText());
					sql.add("insert into aka_rekon_m(no_rekon,no_dokumen,tanggal,keterangan,nilai,posted,modul,akun_titip,nim,nik_buat,nik_app,kode_lokasi,periode,nik_user,tgl_input) values "+
						    "('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"',"+totLunas+",'F','"+this.c_status.getText()+"','"+this.cb_titip.getText()+"','-','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
					
					sql.add("insert into aka_rekon_j(no_rekon,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.cb_titip.getText()+"','"+this.e_ket.getText()+"','D',"+totLunas+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','"+this.c_status.getText()+"','TTP','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");					
					
					this.doHitungAR();
					var line = undefined;
					for (var i in this.gridAR.objList){
						line = this.gridAR.get(i);
						sql.add("insert into aka_rekon_j(no_rekon,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
								"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',"+i+",'"+line.get("kode_akun")+"','"+this.e_ket.getText()+"','C',"+parseFloat(line.get("nilai"))+",'"+line.get("kode_pp")+"','-','"+this.app._lokasi+"','"+this.c_status.getText()+"','PIUT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");
					}											
					
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];
						if (parseFloat(line.lunas) != 0){
							sql.add("insert into aka_rekon_d(no_rekon,nim,no_inv,periode,nilai,kode_lokasi,akun_titip,akun_piutang,kode_produk,dc,modul,id_bank) values "+
									"('"+this.e_nb.getText()+"','"+line.nim+"','"+line.no_inv+"','"+this.e_periode.getText()+"',"+line.lunas+",'"+this.app._lokasi+"','"+this.cb_titip.getText()+"','"+line.akun_piutang+"','"+line.kode_produk+"','D','"+this.c_status.getText()+"','"+line.id_bank+"')");							
						}
					}								
					
					for (var i=0;i < this.sg2.getRowCount();i++){
						if (nilaiToFloat(this.sg2.cells(2,i)) != 0) {
							sql.add("update aka_bill_bea set no_rekon='"+this.e_nb.getText()+"',pakai="+nilaiToFloat(this.sg2.cells(2,i))+" where no_inv='"+this.sg2.cells(3,i)+"' and no_rekon='-' and kode_lokasi='"+this.app._lokasi+"'");
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
					this.sg.clear(1); this.sg1.clear(1); this.sg2.clear(1); 
					setTipeButton(tbSimpan);
					this.pc1.setActivePage(this.pc1.childPage[0]);
					this.c_status.setText("LOAD");
				break;
			case "simpan" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				for (var i=0;i < this.dataJU.rs.rows.length;i++){
					line = this.dataJU.rs.rows[i];
					if (parseFloat(line.lunas) > parseFloat(line.saldo)){
						system.alert(this,"Transaksi tidak valid.","Nilai pelunasan tidak boleh melebihi saldo. Inv : "+line.no_inv + " - " +line.kode_produk);
						return false;						
					}
				}
				var totLunas = nilaiToFloat(this.e_nilai.getText()) + nilaiToFloat(this.e_bea.getText());
				if (totLunas <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai pelunasan tidak boleh nol atau kurang.");
					return false;						
				}
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
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else this.e_periode.setText(this.app._periode);
		this.e_nb.setText("");		
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"aka_rekon_m","no_rekon",this.app._lokasi+"-REK"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_ket.setFocus();
		}
		if (sender == this.bRefresh) this.sg1.clear(1);
	},
	doLoad: function(sender){		
		if (this.cb_fak.getText() != "") {
			this.pc1.setActivePage(this.pc1.childPage[1]);
			this.e_piutang.setText("0");
			this.e_nilai.setText("0");		
			this.e_bea.setText("0");		
			if (this.c_jenis.getText() == "ALL") {
				var strSQL = "select aa.nim,aa.nama as mhs,a.no_inv,a.periode,a.kode_produk,c.nama,a.akun_piutang,(a.nilai-isnull(b.tot_lunas,0)) as saldo,0 as lunas, '-' as id_bank,a.kode_pp "+						 
							 "from  "+
							 
							 "      ("+						 
							 "		select '20'+substring(a.no_inv,7,4) as periode,a.kode_lokasi,a.no_inv,a.nim,a.kode_produk,a.akun_piutang,a.kode_akt,a.kode_pp,a.kode_jalur,a.tahunaka,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as nilai  "+
							 "      from aka_bill_d a "+
							 "		inner join aka_mahasiswa aa on aa.nim=a.nim and aa.kode_lokasi=a.kode_lokasi "+
							 "		inner join aka_jurusan xx on aa.kode_jur=xx.kode_jur and aa.kode_lokasi=xx.kode_lokasi "+
							 "		where a.kode_lokasi='"+this.app._lokasi+"' and xx.kode_fakultas='"+this.cb_fak.getText()+"' "+
							 "      group by a.kode_lokasi,a.no_inv,a.nim,a.kode_produk,a.akun_piutang,a.kode_akt,a.kode_pp,a.kode_jalur,a.tahunaka "+
							 "      ) a "+
							 "      inner join aka_mahasiswa aa on aa.nim=a.nim and aa.kode_lokasi=a.kode_lokasi "+
							 "      inner join aka_produk c on a.kode_produk=c.kode_produk and a.kode_lokasi=c.kode_lokasi and a.kode_akt=c.kode_akt and a.kode_pp=c.kode_pp and a.kode_jalur=c.kode_jalur "+
							 "      inner join aka_produk_prior cc on c.kode_produk=cc.kode_produk and c.kode_lokasi=cc.kode_lokasi and a.tahunaka=cc.tahunaka "+
							 "		inner join aka_jurusan xx on aa.kode_jur=xx.kode_jur and aa.kode_lokasi=xx.kode_lokasi "+
							 "		inner join aka_fakultas yy on xx.kode_fakultas=yy.kode_fakultas and yy.kode_lokasi=xx.kode_lokasi "+
							 "      left join (select a.no_inv,a.nim,a.kode_produk,a.kode_lokasi,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as tot_lunas "+
							 "                 from aka_rekon_d a "+
							 "				   inner join aka_mahasiswa aa on aa.nim=a.nim and aa.kode_lokasi=a.kode_lokasi "+
							 "			   	   inner join aka_jurusan xx on aa.kode_jur=xx.kode_jur and aa.kode_lokasi=xx.kode_lokasi "+
							 "				   where a.kode_lokasi='"+this.app._lokasi+"' and xx.kode_fakultas='"+this.cb_fak.getText()+"' "+
							 "				   group by a.nim,a.no_inv,a.kode_produk,a.kode_lokasi) b on a.nim=b.nim and a.no_inv=b.no_inv and a.kode_produk=b.kode_produk and a.kode_lokasi=b.kode_lokasi "+						 
							 "where yy.kode_fakultas='"+this.cb_fak.getText()+"' and (a.nilai-isnull(b.tot_lunas,0)) > 0 and a.kode_lokasi = '"+this.app._lokasi+"' order by aa.nim,a.periode,cc.no_urut";		
			}
			else {
					var strSQL = "select aa.nim,aa.nama as mhs,a.no_inv,a.periode,a.kode_produk,c.nama,a.akun_piutang,(a.nilai-isnull(b.tot_lunas,0)) as saldo,0 as lunas, '-' as id_bank,a.kode_pp "+						 
							 "from  "+
							 
							 "      ("+						 
							 "		select '20'+substring(a.no_inv,7,4) as periode,a.kode_lokasi,a.no_inv,a.nim,a.kode_produk,a.akun_piutang,a.kode_akt,a.kode_pp,a.kode_jalur,a.tahunaka,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as nilai  "+
							 "      from aka_bill_d a "+
							 "		inner join aka_mahasiswa aa on aa.nim=a.nim and aa.kode_lokasi=a.kode_lokasi "+
							 "		inner join aka_jurusan xx on aa.kode_jur=xx.kode_jur and aa.kode_lokasi=xx.kode_lokasi "+
							 "		where a.kode_lokasi='"+this.app._lokasi+"' and xx.kode_fakultas='"+this.cb_fak.getText()+"' "+
							 "      group by a.kode_lokasi,a.no_inv,a.nim,a.kode_produk,a.akun_piutang,a.kode_akt,a.kode_pp,a.kode_jalur,a.tahunaka "+
							 "      ) a "+
							 "      inner join aka_mahasiswa aa on aa.nim=a.nim and aa.kode_lokasi=a.kode_lokasi "+
							 "      inner join aka_produk c on a.kode_produk=c.kode_produk and a.kode_lokasi=c.kode_lokasi and a.kode_akt=c.kode_akt and a.kode_pp=c.kode_pp and a.kode_jalur=c.kode_jalur "+
							 "      inner join aka_produk_prior cc on c.kode_produk=cc.kode_produk and c.kode_lokasi=cc.kode_lokasi and a.tahunaka=cc.tahunaka "+
							 "		inner join aka_jurusan xx on aa.kode_jur=xx.kode_jur and aa.kode_lokasi=xx.kode_lokasi "+
							 "		inner join aka_fakultas yy on xx.kode_fakultas=yy.kode_fakultas and yy.kode_lokasi=xx.kode_lokasi "+
							 "      left join (select a.no_inv,a.nim,a.kode_produk,a.kode_lokasi,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as tot_lunas "+
							 "                 from aka_rekon_d a "+
							 "				   inner join aka_mahasiswa aa on aa.nim=a.nim and aa.kode_lokasi=a.kode_lokasi "+
							 "			   	   inner join aka_jurusan xx on aa.kode_jur=xx.kode_jur and aa.kode_lokasi=xx.kode_lokasi "+
							 "				   where a.kode_lokasi='"+this.app._lokasi+"' and xx.kode_fakultas='"+this.cb_fak.getText()+"' "+
							 "				   group by a.nim,a.no_inv,a.kode_produk,a.kode_lokasi) b on a.nim=b.nim and a.no_inv=b.no_inv and a.kode_produk=b.kode_produk and a.kode_lokasi=b.kode_lokasi "+						 
							 "where yy.kode_fakultas='"+this.cb_fak.getText()+"' and a.periode = '"+this.c_periode2.getText()+"' and (a.nilai-isnull(b.tot_lunas,0)) > 0 and a.kode_lokasi = '"+this.app._lokasi+"' order by aa.nim,a.periode,cc.no_urut";								
				}

			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				var line;
				var tot = 0;
				for (var i=0;i < this.dataJU.rs.rows.length;i++){
					line = this.dataJU.rs.rows[i];
					tot = tot + parseFloat(line.saldo);
				}		
				this.e_piutang.setText(floatToNilai(tot));
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn.rearrange();
				
				for (var i=0;i<this.dataJU.rs.rows.length;i++){
					line = this.dataJU.rs.rows[i];							
					this.sg.appendData([line.nim,line.mhs,line.no_inv,line.periode,line.kode_produk,line.nama,line.akun_piutang,floatToNilai(line.saldo),floatToNilai(line.lunas),line.id_bank,line.kode_pp]);
				}
				
			} else this.sg.clear(1);			
		}
		else {
			system.alert(this,"Data Fakultas tidak valid.","Data fakultas harus terisi.");
		}
	},
	doTampilData: function(page) {
		this.sg.doSelectPage(page);				
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},	
	
	doHitungAR: function() {
		var row,dtJurnal = new portalui_arrayMap();
		var nemu = false;
		var ix,dtJrnl = 0;
		for (var i=0;i < this.dataJU.rs.rows.length;i++){
			line = this.dataJU.rs.rows[i];
			if (parseFloat(line.lunas) != 0){
				kdAkun = line.akun_piutang;
				kdPP = line.kode_pp;
				nemu = false;
				ix = 0;
				for (var j in dtJurnal.objList){		
				  if ((kdAkun == dtJurnal.get(j).get("kode_akun")) && (kdPP == dtJurnal.get(j).get("kode_pp"))){
					nemu = true;
					row = dtJurnal.get(j);
					ix = j;
					break;
				  }
				}
				if (!nemu){
					row = new portalui_arrayMap();
					row.set("kode_akun",kdAkun);
					row.set("kode_pp",kdPP);
					row.set("nilai",parseFloat(line.lunas));
					dtJrnl++;
					dtJurnal.set(dtJrnl,row);						
				}
				else dtJurnal.get(ix).set("nilai",row.get("nilai") + parseFloat(line.lunas));
			}
		}
		this.gridAR = dtJurnal;
	}, 
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){				
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
						  this.nama_report="server_report_saku2_kopeg_aka_rptAkRekonJurnal";
						  this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_rekon='"+this.e_nb.getText()+"' ";
						  this.filter = this.filter2;
						  this.viewer.prepare();
						  this.viewer.setVisible(true);
						  this.app._mainForm.pButton.setVisible(false);
						  this.app._mainForm.reportNavigator.setVisible(true);
						  this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,1,this.filter2));
						  this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
						  this.app._mainForm.reportNavigator.rearrange();
						  this.showFilter = undefined;
						  this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, 1,  1, this.showFilter, this.app._namalokasi,this.filter2));
						  this.page = 1;
						  this.allBtn = false;
						  this.pc1.hide();							
						}else system.info(this,result,"");
	    			break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doCloseReportClick: function(sender){
		switch(sender.getName()){
			case "PreviewBtn" :        
				window.open(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
			break;
			case "PrintBtn" :
				this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
				try
				{
					window.frames[this.viewer.getFullId() +"_iframe"].focus();
					window.frames[this.viewer.getFullId() +"_iframe"].print();
				}catch(e)
				{alert(e);}
			break;
			default :
				this.pc1.show();   
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();			
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg.clear(1); this.sg1.clear(1); this.sg2.clear(1); 
			setTipeButton(tbSimpan);
			this.pc1.setActivePage(this.pc1.childPage[0]);
			this.c_status.setText("LOAD");
		} catch(e) {
			alert(e);
		}
	}
});