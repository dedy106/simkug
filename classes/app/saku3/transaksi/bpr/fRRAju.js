window.app_saku3_transaksi_bpr_fRRAju = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_bpr_fRRAju.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_bpr_fRRAju";
		this.itemsValue = new arrayList();
		this.maximize();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Reprogramming Berbasis Planning", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["List Pengajuan","Data Pengajuan"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:5,tag:9,		            
					colTitle:["No Bukti","Tanggal","No Dokumen","Deskripsi","Progress"],
					colWidth:[[4,3,2,1,0],[200,300,120,80,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});
				
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,450,20],caption:"No Dokumen", maxLength:50});		
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,450,20],caption:"Deskripsi", maxLength:150});				
		this.cb_app = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});						
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,5,995,305], childPage:["Penerima","Pemberi","Rekap RRA"]});				
		this.cb_ppT = new saiCBBL(this.pc1.childPage[0],{bound:[20,19,220,20],caption:"PP Penerima", multiSelection:false, maxLength:10, tag:9,change:[this,"doChange"]});		
		this.cb_akunT = new saiCBBL(this.pc1.childPage[0],{bound:[20,17,220,20],caption:"Akun Penerima", multiSelection:false, maxLength:10, tag:9,change:[this,"doChange"]});		
		this.cb_mtaT = new saiCBBL(this.pc1.childPage[0],{bound:[20,17,220,20],caption:"MTA Penerima", readOnly:true, visible:false});		
		this.c_bulanT = new saiCB(this.pc1.childPage[0],{bound:[20,19,200,20],caption:"Bulan Penerima", items:["01","02","03","04","05","06","07","08","09","10","11","12"], tag:9,change:[this,"doChange"]}); 		
		this.e_saldo = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,200,20],caption:"Saldo s.d Bulan", tag:9, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.e_terima = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,18,200,20],caption:"Nilai Penerima", tag:9, tipeText:ttNilai, text:"0"});
		this.e_donor = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,19,200,20],caption:"Total Pemberi", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:8,tag:0,
		            colTitle:["Kode Akun","Nama Akun","Kode MTA","Kode PP","Nama PP","Bulan","Saldo TW","Nilai"],
					colWidth:[[7,6,5,4,3,2,1,0],[100,100,80,200,80,80,200,80]],					
					columnReadOnly:[true,[1,2,4,6],[0,3,5,7]],
					colFormat:[[6,7],[cfNilai,cfNilai]],
					buttonStyle:[[0,3,5],[bsEllips,bsEllips,bsAuto]], 
					picklist:[[5],[new portalui_arrayMap({items:["01","02","03","04","05","06","07","08","09","10","11","12"]})]],
					ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});				
		
		this.sgG = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:8,tag:9,
		            colTitle:["Kode Akun","Kode MTA","Kode PP","TW","Saldo Planning","Saldo Controling","RRA Planning","RRA Controlling"],
					colWidth:[[7,6,5,4,3,2,1,0],[100,100,100,100,80,100,100,100]],
					readOnly:true,colFormat:[[4,5,6,7],[cfNilai,cfNilai,cfNilai,cfNilai]],					
					autoAppend:false,defaultRow:1});
		this.sgnG = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sgG});
		this.i_budget = new portalui_imageButton(this.sgnG,{bound:[970,2,20,20],hint:"Cek Anggaran",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungGar"]});
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[0].rearrangeChild(10, 23);	
		
		setTipeButton(tbAllFalse);		
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
			
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='GARAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");
			
			this.cb_ppT.setSQL("select a.kode_pp,a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where b.nik='"+this.app._userLog+"' and a.flag_aktif= '1' and a.kode_lokasi = '"+this.app._lokasi+"'",["c.kode_pp","c.nama"],false,["Kode","Nama"],"and","Data PP",true);			
			
			this.cb_ppT.setText(this.app._kodePP);
			this.cb_akunT.setSQL("select a.kode_akun,a.nama from masakun a where a.kode_lokasi='"+this.app._lokasi+"' and a.status_gar='1' ",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Data Akun",true);		
			this.cb_mtaT.setSQL("select a.kode_gar,a.nama from masgar a where a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_gar","a.nama"],false,["Kode","Nama"],"and","Data MTA",true);		
			
			var sql = new server_util_arrayList(); 
			sql.add("select kode_akun, nama from masakun where status_gar='1' and block='0' and kode_lokasi='"+this.app._lokasi+"'");
			sql.add("select a.kode_pp,a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where b.nik='"+this.app._userLog+"' and a.flag_aktif= '1' and a.kode_lokasi = '"+this.app._lokasi+"'");						
			this.dbLib.getMultiDataProviderA(sql);							
			
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_bpr_fRRAju.extend(window.childForm);
window.app_saku3_transaksi_bpr_fRRAju.implement({
	doHitungGar: function() {
		this.sgG.clear();
		var nilai = total = 0;
		for (var i=0;i < this.sg.getRowCount();i++){
			if (this.sg.rowValid(i)){
				nilai = nilaiToFloat(this.sg.cells(7,i));				
				var isAda = false;
				var idx = total = 0;

				if (this.sg.cells(5,i) == "01" || this.sg.cells(5,i) == "02" || this.sg.cells(5,i) == "03") var twAsal = "TW1";
				if (this.sg.cells(5,i) == "04" || this.sg.cells(5,i) == "05" || this.sg.cells(5,i) == "06") var twAsal = "TW2";
				if (this.sg.cells(5,i) == "07" || this.sg.cells(5,i) == "08" || this.sg.cells(5,i) == "09") var twAsal = "TW3";
				if (this.sg.cells(5,i) == "10" || this.sg.cells(5,i) == "11" || this.sg.cells(5,i) == "12") var twAsal = "TW4";

				for (var j=0;j < this.sgG.getRowCount();j++){
					if (this.sg.cells(0,i) == this.sgG.cells(0,j) && this.sg.cells(3,i) == this.sgG.cells(2,j) && twAsal == this.sgG.cells(3,j)) {
						isAda = true;
						idx = j;
						break;
					}
				}
				if (!isAda) {
					this.sgG.appendData([this.sg.cells(0,i),this.sg.cells(2,i),this.sg.cells(3,i),twAsal,"0","0",floatToNilai(nilai),floatToNilai(nilai)]);
				} 
				else { 
					total = nilaiToFloat(this.sgG.cells(6,idx));
					total = total + nilai;
					this.sgG.setCell(6,idx,total);
					this.sgG.setCell(7,idx,total);
				}
			}
		}

		for (var i=0;i < this.sgG.getRowCount();i++){					
			if (this.sgG.rowValid(i)) {
				if (this.sgG.cells(3,i) == "TW1") var bulanTW = this.e_periode.getText().substr(0,4)+"03";
				if (this.sgG.cells(3,i) == "TW2") var bulanTW = this.e_periode.getText().substr(0,4)+"06";
				if (this.sgG.cells(3,i) == "TW3") var bulanTW = this.e_periode.getText().substr(0,4)+"09";
				if (this.sgG.cells(3,i) == "TW4") var bulanTW = this.e_periode.getText().substr(0,4)+"12";

				var data = this.dbLib.getDataProvider("select fn_saldoAkun('"+this.app._lokasi+"','"+this.sgG.cells(0,i)+"','"+this.sgG.cells(2,i)+"','-','"+bulanTW+"','"+this.e_nb.getText()+"') as gar ",true);				
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];
					data = line.gar.split(";");						
					this.sgG.cells(4,i,floatToNilai(parseFloat(data[0])));
				}
				
				var data = this.dbLib.getDataProvider("select fn_release2('"+this.app._lokasi+"','"+this.sgG.cells(0,i)+"','"+this.sgG.cells(2,i)+"','-','"+bulanTW+"','"+this.e_nb.getText()+"') as gar ",true);				
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];
					data = line.gar.split(";");						
					this.sgG.cells(5,i,floatToNilai(parseFloat(data[0])));
				}

				if (nilaiToFloat(this.sgG.cells(5,i)) < nilaiToFloat(this.sgG.cells(7,i))) {
					this.sgG.cells(7,i,this.sgG.cells(5,i));
				}

			}
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
			var k=0;
			this.doHitungGar();
			for (var i=0;i < this.sgG.getRowCount();i++){
				if (nilaiToFloat(this.sgG.cells(6,i))>0 && nilaiToFloat(this.sgG.cells(4,i)) < nilaiToFloat(this.sgG.cells(6,i))) {
					var k =i+1;
					system.alert(this,"Transaksi tidak valid.","Saldo Planning tidak mencukupi. [Baris : "+k+"]");
					return false;						
				}
			}
			if (this.stsSimpan == 1) this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					if (this.stsSimpan == 0) {
						sql.add("delete from anggaran_d where no_agg='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from angg_rra_m where no_rra='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from angg_rra_d where no_rra='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

						sql.add("delete from angg_release_m where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from angg_release_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from angg_r where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					} 				
					sql.add("insert into angg_rra_m(no_rra,kode_lokasi,tgl_input,nik_user,periode,modul,form,prog_seb,progress,kode_pp,kode_bidang,tanggal,no_dokumen,keterangan,nilai,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3) values "+
						 	"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','PLAN','RRA_PLAN','0','0','"+this.app._kodePP+"','-','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_donor.getText())+",'"+this.cb_app.getText()+"','-','-','-','-','-')");

					var periode ="";
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								periode = this.e_periode.getText().substr(0,4)+this.sg.cells(5,i);								
								sql.add("insert into angg_rra_d(no_rra,kode_lokasi,no_urut,kode_akun,kode_gar,kode_pp,kode_drk,periode,saldo,nilai,dc) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(2,i)+"', '"+this.sg.cells(3,i)+"','-','"+periode+"',"+parseNilai(this.sg.cells(6,i))+","+parseNilai(this.sg.cells(7,i))+",'C')");								
								
								sql.add("insert into anggaran_d(no_agg,kode_lokasi,no_urut,kode_pp,kode_akun,kode_drk,volume,periode,nilai_sat,nilai,dc,satuan,nik_user,tgl_input,modul) values "+		
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg.cells(3,i)+"','"+this.sg.cells(0,i)+"','-',1,'"+periode+"',"+parseNilai(this.sg.cells(7,i))+","+parseNilai(this.sg.cells(7,i))+",'C','-','"+this.app._userLog+"',getdate(),'RRA_PLAN')");
							}
						}
					}
					periode = this.e_periode.getText().substr(0,4)+this.c_bulanT.getText();
					sql.add("insert into angg_rra_d(no_rra,kode_lokasi,no_urut,kode_akun,kode_gar,kode_pp,kode_drk,periode,saldo,nilai,dc) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',999,'"+this.cb_akunT.getText()+"','"+this.cb_mtaT.getText()+"','"+this.cb_ppT.getText()+"','-','"+periode+"',0,"+nilaiToFloat(this.e_terima.getText())+",'D')");								

					
					//hold data release
					var rraCO = 0;
					for (var i=0;i < this.sgG.getRowCount();i++){
						if (this.sgG.rowValid(i) && this.sgG.cells(7,i) != "0"){					
							rraCO += nilaiToFloat(this.sgG.cells(7,i));
							
							if (this.sgG.cells(3,i) == "TW1") var bulanTW = this.e_periode.getText().substr(0,4)+"03";
							if (this.sgG.cells(3,i) == "TW2") var bulanTW = this.e_periode.getText().substr(0,4)+"06";
							if (this.sgG.cells(3,i) == "TW3") var bulanTW = this.e_periode.getText().substr(0,4)+"09";
							if (this.sgG.cells(3,i) == "TW4") var bulanTW = this.e_periode.getText().substr(0,4)+"12";
							
							sql.add("insert into angg_release_d(no_bukti,kode_lokasi,kode_gar,kode_pp,kode_drk,periode,dc,nilai) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sgG.cells(1,i)+"','"+this.sgG.cells(2,i)+"','-','"+bulanTW+"','C',"+nilaiToFloat(this.sgG.cells(7,i))+")");									
						}
					}		

					if (rraCO != 0) {
						sql.add("insert into angg_release_m (no_bukti,kode_lokasi,tgl_input,nik_user,tahun,modul,tanggal,keterangan,nilai) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText().substr(0,4)+"','HOLD','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"',"+rraCO+")");
				
						sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_gar,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai,gar_thn,gar_tw,gar_bulan,no_ref,param1,param2) "+
									"select "+
									"no_bukti,'HOLD',kode_lokasi,kode_gar,kode_pp,kode_drk,periode,periode,dc,0,sum(nilai),0,0,0,'-','-','-' "+
									"from angg_release_d  "+									
									"where no_bukti='"+this.e_nb.getText()+"' "+
									"group by no_bukti,kode_lokasi,kode_gar,kode_pp,kode_drk,periode,dc");
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


				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg.validasi();
				if (nilaiToFloat(this.e_terima.getText()) != nilaiToFloat(this.e_donor.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total Terima dan Pemberi tidak sama.");
					return false;						
				}
				if (nilaiToFloat(this.e_terima.getText()) <= 0 || nilaiToFloat(this.e_donor.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total Terima atau Pemberi tidak boleh nol atau kurang.");
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
				sql.add("delete from anggaran_d where no_agg='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from angg_rra_m where no_rra='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from angg_rra_d where no_rra='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

				sql.add("delete from angg_release_m where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from angg_release_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from angg_r where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				setTipeButton(tbAllFalse);					
				this.dbLib.execArraySQL(sql);
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
		if (this.stsSimpan == 1) this.doClick();			
	},	
	doChange:function(sender){																		
		try{
			if (sender == this.c_bulanT || sender == this.cb_ppT || sender == this.cb_akunT) {				
				this.e_saldo.setText("0");
				if (this.cb_akunT.getText()!="" && this.cb_ppT.getText()!="" && this.c_bulanT.getText()!="") {
					var data = this.dbLib.getDataProvider("select fn_saldoAkun('"+this.app._lokasi+"','"+this.cb_akunT.getText()+"','"+this.cb_ppT.getText()+"','-','"+this.e_periode.getText().substr(0,4)+this.c_bulanT.getText()+"','"+this.e_nb.getText()+"') as gar ",true);				
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line = data.rs.rows[0];						
						data = line.gar.split(";");	
						this.e_saldo.setText(floatToNilai(parseFloat(data[0])));				
					}
				}				
			}	
			if (sender == this.cb_akunT && this.cb_akunT.getText()!="") {
				var data = this.dbLib.getDataProvider("select kode_gar from masakun where kode_akun='"+this.cb_akunT.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);				
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];											
					this.cb_mtaT.setText(line.kode_gar);				
				}
			}	
		}
		catch(e) {
			alert(e);
		}
	},	
	doClick:function(sender){
		if (this.stsSimpan == 0)  {
			this.standarLib.clearByTag(this, new Array("9"),undefined);			
			this.sg.clear(1); 					
			this.sgG.clear(1); 
			this.sg3.clear(1); 					
		}
		this.stsSimpan = 1;
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"angg_rra_m","no_rra",this.app._lokasi+"-RRA"+this.e_periode.getText().substr(2,4)+".","0000"));
		this.e_dok.setFocus();
		setTipeButton(tbSimpan);			
	},		
	doChangeCell: function(sender, col, row){
		if (col == 7 && this.sg.cells(7,row) != "") this.sg.validasi();
		sender.onChange.set(undefined,undefined);
	    if (col == 0) {
			if (this.sg.cells(0,row) != "") {
				var akun = this.dataAkun.get(sender.cells(0,row));
				if (akun) {
					sender.cells(1,row,akun);
					var data = this.dbLib.getDataProvider("select kode_gar from masakun where kode_akun='"+this.sg.cells(0,row)+"' and kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							sender.cells(2,row,line.kode_gar);							
						} 
					}
				}
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Akun "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}				
			}
		}
		if (col == 3) {
			if (this.sg.cells(3,row) != "") {
				var pp = this.dataPP.get(sender.cells(3,row));
				if (pp) sender.cells(4,row,pp);
				else {
					if (trim(sender.cells(3,row)) != "") system.alert(this,"Kode PP "+sender.cells(3,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(3,row,"");
					sender.cells(4,row,"");
				}				
			}
		}
		
		if (col == 0 || col == 3 || col == 5) {
			if (sender.cells(0,row) != "" && sender.cells(3,row) != "" && sender.cells(5,row) != "") {
				var totSeb = 0;
				for (var j=0; j < this.sg.getRowCount();j++){
					if (j < row && sender.cells(0,row) == this.sg.cells(0,j) && sender.cells(3,row) == this.sg.cells(3,j) && sender.cells(5,row) == this.sg.cells(5,j) ) {
						totSeb += nilaiToFloat(this.sg.cells(7,j));
					}
				}											

				if (sender.cells(5,row) == "01" || sender.cells(5,row) == "02" || sender.cells(5,row) == "03") var perTW = this.e_periode.getText().substr(0,4)+"03";
				if (sender.cells(5,row) == "04" || sender.cells(5,row) == "05" || sender.cells(5,row) == "06") var perTW = this.e_periode.getText().substr(0,4)+"06";
				if (sender.cells(5,row) == "07" || sender.cells(5,row) == "08" || sender.cells(5,row) == "09") var perTW = this.e_periode.getText().substr(0,4)+"09";
				if (sender.cells(5,row) == "10" || sender.cells(5,row) == "11" || sender.cells(5,row) == "12") var perTW = this.e_periode.getText().substr(0,4)+"12";

				var data = this.dbLib.getDataProvider("select fn_saldoAkun('"+this.app._lokasi+"','"+sender.cells(0,row)+"','"+sender.cells(3,row)+"','-','"+perTW+"','"+this.e_nb.getText()+"') as gar ",true);				
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];
					data = line.gar.split(";");			
					sakhir = parseFloat(data[0]) - totSeb;
					this.sg.cells(6,row,floatToNilai(sakhir));
				}
				
			}
		}	

		sender.onChange.set(this,"doChangeCell");		
	},
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
												  "select kode_akun,nama    from masakun where status_gar ='1' and block= '0' and kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(kode_akun)  from masakun where status_gar ='1' and block= '0' and kode_lokasi = '"+this.app._lokasi+"'",
												  ["kode_akun","nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 2){
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 												  
								"select a.kode_pp, a.nama  from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where b.nik='"+this.app._userLog+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.flag_aktif ='1'",
								"select count(a.kode_pp)  from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where b.nik='"+this.app._userLog+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.flag_aktif ='1'",						
								["a.kode_pp","a.nama"],"and",["Kode","Nama"],false);				
						
				}				
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doNilaiChange: function(){
		try{
			var totD = totC = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(7,i) != ""){					
					totC += nilaiToFloat(this.sg.cells(7,i));
				}
			}						
			this.e_donor.setText(floatToNilai(totC));
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
					case "getMultiDataProvider":
	    			    eval("result = "+result+";");
	    			    if (typeof result != "string"){
                            this.dataAkun = new portalui_arrayMap();
							this.dataPP = new portalui_arrayMap();							
	    			        if (result.result[0]){	    			        
	    			            var line;
	    			            for (var i in result.result[0].rs.rows){
	    			                line = result.result[0].rs.rows[i];
	    			                this.dataAkun.set(line.kode_akun, line.nama);
                                }
                            }
							if (result.result[1]){	    			        
	    			            var line;
	    			            for (var i in result.result[1].rs.rows){
	    			                line = result.result[1].rs.rows[i];
	    			                this.dataPP.set(line.kode_pp, line.nama);
                                }
                            }							
                        }else throw result;
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
		var strSQL = "select a.no_rra,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.keterangan,a.progress "+
		             "from angg_rra_m a "+					 					 
					 "where a.form = 'RRA_PLAN' and a.kode_lokasi='"+this.app._lokasi+"' and a.progress in ('0','R') order by a.tanggal";		
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
			this.sg3.appendData([line.no_rra,line.tgl,line.no_dokumen,line.keterangan,line.progress]); 
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
							
				var strSQL = "select * from angg_rra_m a "+
							 "where a.no_rra='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.cb_app.setText(line.nik1);					
						this.dp_d1.setText(line.tanggal);	
						this.e_dok.setText(line.no_dokumen);					
						this.e_ket.setText(line.keterangan);						
					}
				}

				var strSQL = "select substring(a.periode,5,2) as bulan,a.kode_pp,b.nama as nama_pp,a.kode_akun,c.nama as nama_akun,a.nilai,c.kode_gar "+
							 "from angg_rra_d a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "				    inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+							 
							 "where a.no_rra='"+this.e_nb.getText()+"' and a.dc ='C' ";					
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear(1);
					for (var i in data.rs.rows){
						line = data.rs.rows[i];						
						this.sg.appendData([line.kode_akun,line.nama_akun,line.kode_gar,line.kode_pp,line.nama_pp,line.bulan,"0",floatToNilai(line.nilai)]);
					}
				} else this.sg.clear(1);	

				var strSQL = "select substring(a.periode,5,2) as bulan,a.kode_pp,a.kode_akun,a.nilai "+
							 "from angg_rra_d a "+
							 "where a.no_rra='"+this.e_nb.getText()+"' and a.dc ='D' ";					
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];							
					this.cb_ppT.setText(line.kode_pp);
					this.cb_akunT.setText(line.kode_akun);					
					this.c_bulanT.setText(line.bulan);
					this.e_terima.setText(floatToNilai(line.nilai));
				}				
			}									
		} catch(e) {alert(e);}
	}	
});
