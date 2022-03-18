window.app_saku3_transaksi_gar_fRRAju = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_gar_fRRAju.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_gar_fRRAju";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Reprogramming Approve Pusat: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Pengajuan","List Pengajuan"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:5,tag:9,		            
					colTitle:["No Bukti","Tanggal","No Dokumen","Deskripsi","Progress"],
					colWidth:[[4,3,2,1,0],[200,300,120,80,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});				
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,450,20],caption:"No Dokumen", maxLength:50});		
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,450,20],caption:"Deskripsi", maxLength:150});				
		this.e_debet = new saiLabelEdit(this.pc2.childPage[0],{bound:[780,13,200,20],caption:"Total Terima", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.cb_app = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});						
		this.e_kredit = new saiLabelEdit(this.pc2.childPage[0],{bound:[780,17,200,20],caption:"Total Donor", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,5,995,305], childPage:["Reprogramming","Data Donor","Data Penerima","Cek Anggaran"]});		
		this.cb_lokasiD = new saiCBBL(this.pc1.childPage[0],{bound:[20,18,220,20],caption:"Lokasi Donor", multiSelection:false, maxLength:10, tag:9,change:[this,"doChange"]});		
		this.cb_ppD = new saiCBBL(this.pc1.childPage[0],{bound:[20,19,220,20],caption:"PP Donor", multiSelection:false, maxLength:10, tag:9,change:[this,"doChange"]});		
		this.cb_akunD = new saiCBBL(this.pc1.childPage[0],{bound:[20,17,220,20],caption:"Akun Donor", multiSelection:false, maxLength:10, tag:9,change:[this,"doChange"]});
		this.cb_drkD = new saiCBBL(this.pc1.childPage[0],{bound:[20,18,220,20],caption:"DRK Donor", multiSelection:false, maxLength:10, tag:9,change:[this,"doChange"]});
		this.c_bulanD = new saiCB(this.pc1.childPage[0],{bound:[20,19,200,20],caption:"Bulan Donor", items:["01","02","03","04","05","06","07","08","09","10","11","12"], tag:9,change:[this,"doChange"]}); 
		this.e_saldo = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,20,200,20],caption:"Saldo", tag:9, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,21,200,20],caption:"Nilai Redis", tag:9, tipeText:ttNilai, text:"0",change:[this,"doChange"]});
	
		this.cb_lokasiT = new saiCBBL(this.pc1.childPage[0],{bound:[20,18,220,20],caption:"Lokasi Penerima", multiSelection:false, maxLength:10, tag:9,change:[this,"doChange"]});		
		this.cb_ppT = new saiCBBL(this.pc1.childPage[0],{bound:[20,19,220,20],caption:"PP Penerima", multiSelection:false, maxLength:10, tag:9});		
		this.cb_akunT = new saiCBBL(this.pc1.childPage[0],{bound:[20,17,220,20],caption:"Akun Penerima", multiSelection:false, maxLength:10, tag:9});
		this.cb_drkT = new saiCBBL(this.pc1.childPage[0],{bound:[20,18,220,20],caption:"DRK Penerima", multiSelection:false, maxLength:10, tag:9});
		this.c_bulanT = new saiCB(this.pc1.childPage[0],{bound:[20,19,200,20],caption:"Bulan Penerima", items:["01","02","03","04","05","06","07","08","09","10","11","12"], tag:9}); 
		this.i_ok = new portalui_imageButton(this.pc1.childPage[0],{bound:[225,19,20,20],hint:"Reprogramming",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doRedis"]});
				
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:9,tag:0,
		            colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Kode DRK","Nama DRK","Bulan","Saldo","Nilai"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[100,10,80,150,80,150,80,150,80]],
					colHide:[[7],[true]],
					readOnly:true,colFormat:[[7,8],[cfNilai,cfNilai]],nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});				
		
		this.sg2 = new saiGrid(this.pc1.childPage[2],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:8,tag:0,
		            colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Kode DRK","Nama DRK","Bulan","Nilai"],
					colWidth:[[7,6,5,4,3,2,1,0],[100,80,150,80,150,80,150,80]],
					readOnly:true,colFormat:[[7],[cfNilai]],nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg2});		
		
		this.sgG = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:10,tag:9,
		            colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Kode DRK","Nama DRK","Saldo Awal","Nilai","Saldo Akhir","Bulan"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[80,80,80,80,150,80,150,80,150,80]],
					readOnly:true,colFormat:[[6,7,8],[cfNilai,cfNilai,cfNilai]],autoAppend:true,defaultRow:1});
		this.sgnG = new portalui_sgNavigator(this.pc1.childPage[3],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sgG});
		this.i_budget = new portalui_imageButton(this.sgnG,{bound:[955,2,20,20],hint:"Cek Anggaran",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungGar"]});
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[0].rearrangeChild(10, 23);	
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;			
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			/*
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='GARAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");
			*/
			
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIk","Nama"],"and","Data Approve",true);
			
			if (this.app._lokasi == this.app._kodeLokasiPusat) {
				this.cb_lokasiD.setSQL("select kode_lokasi,nama from lokasi where kode_lokasi<>'"+this.app._kodeLokasiKonsol+"'",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi",true);
				this.cb_lokasiT.setSQL("select kode_lokasi,nama from lokasi where kode_lokasi<>'"+this.app._kodeLokasiKonsol+"'",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi",true);
			}
			else {
				this.cb_lokasiD.setSQL("select kode_lokasi,nama from lokasi where kode_lokasi='"+this.app._lokasi+"'",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi",true);
				this.cb_lokasiT.setSQL("select kode_lokasi,nama from lokasi where kode_lokasi='"+this.app._lokasi+"'",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi",true);
			}			
			this.cb_lokasiD.setText(this.app._lokasi);
			this.cb_lokasiT.setText(this.app._lokasi);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_gar_fRRAju.extend(window.childForm);
window.app_saku3_transaksi_gar_fRRAju.implement({
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
			var k=0;
			this.doHitungGar();
			for (var i=0;i < this.sgG.getRowCount();i++){
				if (nilaiToFloat(this.sgG.cells(7,i))>0 && nilaiToFloat(this.sgG.cells(6,i)) < nilaiToFloat(this.sgG.cells(7,i))) {
					var k =i+1;
					system.alert(this,"Transaksi tidak valid.","Saldo Anggaran tidak mencukupi. [Baris : "+k+"]");
					return false;						
				}
			}
			if (this.stsSimpan == 1) this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					if (this.stsSimpan == 0) {
						sql.add("delete from anggaran_m where no_agg='"+this.e_nb.getText()+"'");
						sql.add("delete from anggaran_d where no_agg='"+this.e_nb.getText()+"'");
						sql.add("delete from rra_pdrk_m where no_pdrk='"+this.e_nb.getText()+"'");
						sql.add("delete from rra_pdrk_d where no_pdrk='"+this.e_nb.getText()+"'");
					} 					
					sql.add("insert into anggaran_m (no_agg,kode_lokasi,no_dokumen,tanggal,keterangan,tahun,kode_curr,nilai,tgl_input,nik_user,posted,no_del,nik_buat,nik_setuju,jenis) values  "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.e_periode.getText().substr(0,4)+"','IDR',"+parseNilai(this.e_debet.getText())+",getdate(),'"+this.app._userLog+"','T','-','"+this.app._userLog+"','"+this.cb_app.getText()+"','RR')");					
					sql.add("insert into rra_pdrk_m(no_pdrk,kode_lokasi,keterangan,kode_pp,kode_bidang,jenis_agg,tanggal,periode,nik_buat,nik_app1,nik_app2,nik_app3,sts_pdrk,justifikasi, nik_user, tgl_input,progress,modul) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','-','-','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"','"+this.app._userLog+"','"+this.app._userLog+"','"+this.cb_app.getText()+"','"+this.cb_app.getText()+"','RRR','-','"+this.app._userLog+"',getdate(),'0','MULTI')");
					var periode ="";
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								periode = this.e_periode.getText().substr(0,4)+this.sg.cells(6,i);
								sql.add("insert into rra_pdrk_d(no_pdrk,kode_lokasi,no_urut,kode_akun,kode_pp,kode_drk,periode,saldo,nilai,dc,target) values "+
										"('"+this.e_nb.getText()+"','"+this.sg.cells(2,i).substr(0,2)+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(4,i)+"','"+periode+"',"+parseNilai(this.sg.cells(7,i))+","+parseNilai(this.sg.cells(8,i))+",'C','-')");
								sql.add("insert into anggaran_d(no_agg,kode_lokasi,no_urut,kode_pp,kode_akun,kode_drk,volume,periode,nilai_sat,nilai,dc,satuan,nik_user,tgl_input,modul) values "+		
										"('"+this.e_nb.getText()+"','"+this.sg.cells(2,i).substr(0,2)+"',"+i+",'"+this.sg.cells(2,i)+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(4,i)+"',1,'"+periode+"',"+parseNilai(this.sg.cells(8,i))+","+parseNilai(this.sg.cells(8,i))+",'C','-','"+this.app._userLog+"',getdate(),'RRPUSAT')");
							}
						}
					}
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								periode = this.e_periode.getText().substr(0,4)+this.sg2.cells(6,i);
								sql.add("insert into rra_pdrk_d(no_pdrk,kode_lokasi,no_urut,kode_akun,kode_pp,kode_drk,periode,saldo,nilai,dc,target) values "+
										"('"+this.e_nb.getText()+"','"+this.sg2.cells(2,i).substr(0,2)+"',"+i+",'"+this.sg2.cells(0,i)+"','"+this.sg2.cells(2,i)+"','"+this.sg2.cells(4,i)+"','"+periode+"',0,"+parseNilai(this.sg2.cells(7,i))+",'D','-')");
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
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);			
					this.sg.clear(1); 
					this.sg2.clear(1); 
					this.sgG.clear(1); 
					this.sg3.clear(1); 
					setTipeButton(tbAllFalse);													
					this.pc2.setActivePage(this.pc2.childPage[0]);				
					this.pc1.setActivePage(this.pc1.childPage[0]);				
				break;
			case "simpan" :					
			case "ubah" :	
				this.preView = "1";
				for (var i=0;i < this.sg.getRowCount();i++){					
					if (!this.sg.rowValid(i)){
						var isKosong = true;
						for (var j=0;j < this.sg.getColCount();j++){
							if (this.sg.cells(j,i) != "") {
								isKosong = false;
								break;
							}
						}						
						if (!isKosong) {
							system.alert(this,"Transaksi tidak valid.","Terdapat kolom yang kosong.");
							return false;
						}
					}					
				}				
				for (var i=0;i < this.sg2.getRowCount();i++){					
					if (!this.sg2.rowValid(i)){
						var isKosong = true;
						for (var j=0;j < this.sg2.getColCount();j++){
							if (this.sg2.cells(j,i) != "") {
								isKosong = false;
								break;
							}
						}						
						if (!isKosong) {
							system.alert(this,"Transaksi tidak valid.","Terdapat kolom yang kosong.");
							return false;
						}
					}					
				}								
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg.validasi();
				this.sg2.validasi();
				if (nilaiToFloat(this.e_kredit.getText()) != nilaiToFloat(this.e_debet.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total Terima dan Donor tidak sama.");
					return false;						
				}
				if (nilaiToFloat(this.e_kredit.getText()) <= 0 || nilaiToFloat(this.e_debet.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total Terima dan Donor tidak boleh nol atau kurang.");
					return false;						
				}
				if (this.app._periode.substr(0,4) > this.e_periode.getText().substr(0,4)){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi harus dalam tahun anggaran yang sama.["+this.app._periode.substr(0,4)+"]");
					return false;
				}
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				this.preView = "0";
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();					
				sql.add("delete from anggaran_m where no_agg='"+this.e_nb.getText()+"' ");
				sql.add("delete from anggaran_d where no_agg='"+this.e_nb.getText()+"' ");
				sql.add("delete from rra_pdrk_m where no_pdrk='"+this.e_nb.getText()+"' ");
				sql.add("delete from rra_pdrk_d where no_pdrk='"+this.e_nb.getText()+"' ");
				setTipeButton(tbAllFalse);					
				this.dbLib.execArraySQL(sql);
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else this.e_periode.setText(this.app._periode);		
		if (this.stsSimpan == 1) this.doClick();		
		this.cb_drkT.setSQL("select kode_drk, nama from drk where kode_lokasi='"+this.app._lokasi+"' and tahun ='"+this.e_periode.getText().substr(0,4)+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true);
	},	
	doChange:function(sender){				
		if (sender == this.cb_lokasiD && this.cb_lokasiD.getText() != "") {
			this.cb_ppD.setText("","");
			this.cb_ppD.setSQL("select c.kode_pp, c.nama from pp c where c.kode_lokasi='"+this.cb_lokasiD.getText()+"'",["c.kode_pp","c.nama"],false,["Kode","Nama"],"and","Data PP",true);			
		}
		if (sender == this.cb_lokasiT && this.cb_lokasiT.getText() != "") {
			this.cb_ppT.setText("","");
			this.cb_ppT.setSQL("select c.kode_pp, c.nama from pp c where c.kode_lokasi='"+this.cb_lokasiT.getText()+"'",["c.kode_pp","c.nama"],false,["Kode","Nama"],"and","Data PP",true);			
		}	
		if (sender == this.cb_ppD && this.cb_ppD.getText() != "") {
			this.cb_akunD.setSQL("select distinct a.kode_akun, a.nama from masakun a inner join anggaran_d b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+								 
			                     "where b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_lokasi='"+this.cb_lokasiD.getText()+"' and b.kode_pp='"+this.cb_ppD.getText()+"' ",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Data Akun Donor",true);
		}			
		if (sender == this.cb_akunD || sender == this.cb_ppD) {
			this.e_saldo.setText("0");						
			if (this.cb_akunD.getText()!="" && this.cb_ppD.getText()!=""){			
				var strSQL = "select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.cb_akunD.getText()+"' and b.kode_pp = '"+this.cb_ppD.getText()+"' and a.kode_lokasi='"+this.cb_lokasiD.getText()+"'";				
				this.cb_drkD.setSQL(strSQL,["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK Donor",true);				
								
				strSQL = "select a.kode_akun,a.nama from masakun a where a.kode_lokasi='"+this.cb_lokasiT.getText()+"' and a.status_gar='1' ";
				this.cb_akunT.setSQL(strSQL,["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Data Akun",true);
			}
		}		
		if (sender == this.c_bulanD || sender == this.cb_drkD || sender == this.cb_ppD || sender == this.cb_akunD) {
			this.e_saldo.setText("0");
			if (this.cb_akunD.getText()!="" && this.cb_ppD.getText()!="" && this.cb_drkD.getText()!="" && this.c_bulanD.getText()!="") {				
				var totSeb = 0;
				for (var j=0;j < this.sg.getRowCount();j++){
					if (this.cb_akunD.getText() == this.sg.cells(0,j) && this.cb_ppD.getText() == this.sg.cells(2,j) && this.cb_drkD.getText() == this.sg.cells(4,j) && this.c_bulanD.getText() == this.sg.cells(6,j)) {
						totSeb += nilaiToFloat(this.sg.cells(8,j));
					}
				}				
				var data = this.dbLib.getDataProvider("select fn_cekaggBulan('"+this.cb_ppD.getText()+"','"+this.cb_lokasiD.getText()+"','"+this.cb_akunD.getText()+"','"+this.cb_drkD.getText()+"','"+this.e_periode.getText().substr(0,4)+this.c_bulanD.getText()+"','"+this.e_nb.getText()+"') as gar ",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];
					data = line.gar.split(";");
					sls = parseFloat(data[0]) - parseFloat(data[1]) - totSeb;
					this.e_saldo.setText(floatToNilai(sls));				
				}
			}
		}		
	},
	doRedis:function(sender){			
		if (nilaiToFloat(this.e_nilai.getText()) > nilaiToFloat(this.e_saldo.getText()) || nilaiToFloat(this.e_nilai.getText()) <= 0) {
			system.alert(this,"Nilai tidak valid.","Nilai tidak boleh melebihi saldo atau kurang/sama dari nol");
			return false;
		}		
		else {					
			var stsLegal = true;
			if (this.app._kodeBidang != "2") {
				if (this.c_bulanD.getText() == "03" ) {										//|| this.c_bulanD.getText() == "02" || this.c_bulanD.getText() == "01"
					if (this.c_bulanT.getText() != "01" && this.c_bulanT.getText() != "02" && this.c_bulanT.getText() != "03") stsLegal = false;
				}
				if (this.c_bulanD.getText() == "06" ) {										//|| this.c_bulanD.getText() == "05" || this.c_bulanD.getText() == "04"
					if (this.c_bulanT.getText() != "04" && this.c_bulanT.getText() != "05" && this.c_bulanT.getText() != "06") stsLegal = false;				
				}
				if (this.c_bulanD.getText() == "09" ) {										//|| this.c_bulanD.getText() == "08" || this.c_bulanD.getText() == "07"
					if (this.c_bulanT.getText() != "07" && this.c_bulanT.getText() != "08" && this.c_bulanT.getText() != "09") stsLegal = false;				
				}
			}
			//if (stsLegal) {
				if (this.sg.cells(0,0) == "") this.sg.clear();
				if (this.sg2.cells(0,0) == "") this.sg2.clear();			
				this.sg.appendData([this.cb_akunD.getText(),this.cb_akunD.rightLabelCaption,this.cb_ppD.getText(),this.cb_ppD.rightLabelCaption,this.cb_drkD.getText(),this.cb_drkD.rightLabelCaption,this.c_bulanD.getText(),this.e_saldo.getText(),this.e_nilai.getText()]);  
				this.sg2.appendData([this.cb_akunT.getText(),this.cb_akunT.rightLabelCaption,this.cb_ppT.getText(),this.cb_ppT.rightLabelCaption,this.cb_drkT.getText(),this.cb_drkT.rightLabelCaption,this.c_bulanT.getText(),this.e_nilai.getText()]);							
				
				this.cb_drkD.setText("","");
				this.e_saldo.setText("0");
				this.e_nilai.setText("0");			
				this.sg.validasi();			
			//}
			//else {
			//	system.alert(this,"Transaksi tidak valid.","Lakukan Reprogramming Berbeda TW dari menu UPLOAD.");
			//}
		}
	},
	doClick:function(sender){
		if (this.stsSimpan == 0)  {
			this.standarLib.clearByTag(this, new Array("9"),undefined);			
			this.sg.clear(1);
			this.sg2.clear(1);			
			this.sgG.clear(1);					
			this.sg3.clear(1); 
		}
		this.stsSimpan = 1;
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"anggaran_m","no_agg",this.app._lokasi+"-RRP"+this.e_periode.getText().substr(2,4)+".","0000"));
		this.e_dok.setFocus();
		setTipeButton(tbSimpan);			
	},		
	doNilaiChange: function(){
		try{
			var totD = totC = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(8,i) != ""){					
					totC += nilaiToFloat(this.sg.cells(8,i));
				}
			}
			for (var i = 0; i < this.sg2.rows.getLength();i++){
				if (this.sg2.rowValid(i) && this.sg2.cells(7,i) != ""){
					totD += nilaiToFloat(this.sg2.cells(7,i));
				}
			}			
			this.e_debet.setText(floatToNilai(totD));
			this.e_kredit.setText(floatToNilai(totC));
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
						if (result.toLowerCase().search("error") == -1){							
							if (this.preView == "1") {								
								this.nama_report = "server_report_saku2_kopeg_sju_rptPrQuo";
								this.filter = " where a.kode_lokasi='" + this.app._lokasi + "' and a.no_app='" + this.e_nb.getText() + "' ";
								this.filter2 = "";
								this.viewer.prepare();
								this.viewer.setVisible(true);
								this.app._mainForm.pButton.setVisible(false);
								this.app._mainForm.reportNavigator.setVisible(true);
								this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report, this.filter, 1, this.filter2));
								this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
								this.app._mainForm.reportNavigator.rearrange();
								this.showFilter = undefined;
								this.viewer.useIframe(this.report.previewWithHeader(this.nama_report, this.filter, 1, 1, this.showFilter, this.app._namalokasi, this.filter2));
								this.page = 1;
								this.allBtn = false;
								this.pc2.hide();								
							}
							else {
								system.info(this, "Transaksi telah sukses tereksekusi (No Bukti : " + this.e_nb.getText() + ")", "");
								this.clearLayar();
							}
						}
						else {													
							if (result.toLowerCase().search("primary key") == -1){
								alert(error);
							}
							else this.simpan();						   						
						}
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
				this.pc2.show();   
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();				
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);			
			this.sg.clear(1); 
			this.sg2.clear(1); 
			this.sgG.clear(1); 
			this.sg3.clear(1); 
			setTipeButton(tbAllFalse);											
			this.pc2.setActivePage(this.pc2.childPage[0]);				
			this.pc1.setActivePage(this.pc1.childPage[0]);				
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																						
		var strSQL = "select a.no_pdrk,convert(varchar,a.tanggal,103) as tgl,b.no_dokumen,a.keterangan,a.progress "+
		             "from rra_pdrk_m a inner join anggaran_m b on a.no_pdrk=b.no_agg and a.kode_lokasi=b.kode_lokasi "+					 					 
					 "where a.modul = 'MULTI' and a.kode_lokasi='"+this.app._lokasi+"' and a.progress in ('0','R') order by a.tanggal";		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.doTampilData3(1);
		} else this.sg3.clear(1);					
	},
	doTampilData3: function(page) {
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];													
			this.sg3.appendData([line.no_pdrk,line.tgl,line.no_dokumen,line.keterangan,line.progress]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},	
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));																				
							
				var strSQL = "select b.no_dokumen,a.nik_app3,a.tanggal,a.keterangan "+
				             "from rra_pdrk_m a inner join anggaran_m b on a.no_pdrk=b.no_agg and a.kode_lokasi=b.kode_lokasi "+
							 "where a.no_pdrk='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.cb_app.setText(line.nik_app3);					
						this.dp_d1.setText(line.tanggal);	
						this.e_dok.setText(line.no_dokumen);					
						this.e_ket.setText(line.keterangan);						
					}
				}

				var strSQL = "select substring(a.periode,5,2) as bulan,a.kode_pp,b.nama as nama_pp,a.kode_drk,d.nama as nama_drk,a.kode_akun,c.nama as nama_akun,a.nilai "+
							 "from rra_pdrk_d a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "				    inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
							 "				    inner join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4)  "+
							 "where a.no_pdrk='"+this.e_nb.getText()+"' and a.dc ='C' ";					
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear(1);
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.kode_akun,line.nama_akun,line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk,line.bulan,"0",floatToNilai(line.nilai)]);
					}
				} else this.sg.clear(1);
				
				var strSQL = "select substring(a.periode,5,2) as bulan,a.kode_pp,b.nama as nama_pp,a.kode_drk,d.nama as nama_drk,a.kode_akun,c.nama as nama_akun,a.nilai "+
							 "from rra_pdrk_d a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "				    inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
							 "				    inner join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4)  "+
							 "where a.no_pdrk='"+this.e_nb.getText()+"' and a.dc ='D' ";					
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear(1);
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg2.appendData([line.kode_akun,line.nama_akun,line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk,line.bulan,floatToNilai(line.nilai)]);
					}
				} else this.sg2.clear(1);
				
				
			}									
		} catch(e) {alert(e);}
	},
	doHitungGar: function(){
		this.sgG.clear();
		var nilai = total = 0;
		for (var i=0;i < this.sg.getRowCount();i++){
			if (this.sg.rowValid(i)){
				nilai = nilaiToFloat(this.sg.cells(8,i));				
				var isAda = false;
				var idx = total = 0;
				for (var j=0;j < this.sgG.getRowCount();j++){
					if (this.sg.cells(0,i) == this.sgG.cells(0,j) && this.sg.cells(2,i) == this.sgG.cells(2,j) && this.sg.cells(4,i) == this.sgG.cells(4,j) && this.sg.cells(6,i) == this.sgG.cells(9,j)) {
						isAda = true;
						idx = j;
						break;
					}
				}
				if (!isAda) {
					this.sgG.appendData([this.sg.cells(0,i),this.sg.cells(1,i),this.sg.cells(2,i),this.sg.cells(3,i),this.sg.cells(4,i),this.sg.cells(5,i),"0",floatToNilai(nilai),"0",this.sg.cells(6,i)]);
				} 
				else { 
					total = nilaiToFloat(this.sgG.cells(7,idx));
					total = total + nilai;
					this.sgG.setCell(7,idx,total);
				}
			}
		}
		
		var sls = 0;
		var tahun = this.e_periode.getText().substr(0,4);
		for (var i=0;i < this.sgG.getRowCount();i++){						
			var data = this.dbLib.getDataProvider("select fn_cekaggBulan('"+this.sgG.cells(2,i)+"','"+this.sgG.cells(2,i).substr(0,2)+"','"+this.sgG.cells(0,i)+"','"+this.sgG.cells(4,i)+"','"+this.e_periode.getText().substr(0,4)+this.sgG.cells(9,i)+"','"+this.e_nb.getText()+"') as gar ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];
				data = line.gar.split(";");
				sls = parseFloat(data[0]) - parseFloat(data[1]);
				this.sgG.cells(6,i,floatToNilai(sls));
				sls = sls - nilaiToFloat(this.sgG.cells(7,i));
				this.sgG.cells(8,i,floatToNilai(sls));
			}
		}
	}
});
