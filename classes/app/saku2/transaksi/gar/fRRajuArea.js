window.app_saku2_transaksi_gar_fRRajuArea = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_gar_fRRajuArea.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_gar_fRRajuArea";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Reprogramming Bulanan: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new saiLabelEdit(this,{bound:[20,16,450,20],caption:"No Dokumen", maxLength:50});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				
		this.cb_buat = new saiCBBL(this,{bound:[20,16,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});		
		this.e_debet = new saiLabelEdit(this,{bound:[700,16,220,20],caption:"Total Debet", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});						
		this.e_kredit = new saiLabelEdit(this,{bound:[700,17,220,20],caption:"Total Kredit", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.pc1 = new pageControl(this,{bound:[20,16,900, 330], childPage:["Inputan","Data Donor","Data Penerima"]});		
		this.cb_akunD = new saiCBBL(this.pc1.childPage[0],{bound:[20,17,200,20],caption:"Akun Donor", multiSelection:false, maxLength:10, tag:9,change:[this,"doChange"]});
		this.cb_ppD = new saiCBBL(this.pc1.childPage[0],{bound:[20,19,200,20],caption:"PP Donor", multiSelection:false, maxLength:10, tag:9,change:[this,"doChange"]});
		this.cb_drkD = new saiCBBL(this.pc1.childPage[0],{bound:[20,18,200,20],caption:"DRK Donor", multiSelection:false, maxLength:10, tag:9,change:[this,"doChange"]});
		this.c_bulanD = new saiCB(this.pc1.childPage[0],{bound:[20,19,182,20],caption:"Bulan Donor", readOnly:true,tag:9,change:[this,"doChange"]});
		this.e_saldo = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,20,200,20],caption:"Saldo", tag:9, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,21,200,20],caption:"Nilai Redis", tag:9, tipeText:ttNilai, text:"0",change:[this,"doChange"]});
	
		this.cb_akunT = new saiCBBL(this.pc1.childPage[0],{bound:[20,17,200,20],caption:"Akun Penerima", multiSelection:false, maxLength:10, tag:9});
		this.cb_ppT = new saiCBBL(this.pc1.childPage[0],{bound:[20,19,200,20],caption:"PP Penerima", multiSelection:false, maxLength:10, tag:9});
		this.cb_drkT = new saiCBBL(this.pc1.childPage[0],{bound:[20,18,200,20],caption:"DRK Penerima", multiSelection:false, maxLength:10, tag:9});
		this.c_bulanT = new saiCB(this.pc1.childPage[0],{bound:[20,19,182,20],caption:"Bulan Penerima", readOnly:true,tag:9});
		this.i_ok = new portalui_imageButton(this.pc1.childPage[0],{bound:[205,19,20,20],hint:"Redis",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doRedis"]});
				
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,10,this.pc1.width-5,this.pc1.height-35],colCount:9,tag:0,
		            colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Kode DRK","Nama DRK","Periode","Saldo","Nilai"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[100,100,80,150,80,150,80,150,80]],
					readOnly:true,
					colFormat:[[7,8],[cfNilai,cfNilai]],nilaiChange:[this,"doNilaiChange"],
					checkItem:true,autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		
		
		this.sg2 = new saiGrid(this.pc1.childPage[2],{bound:[1,10,this.pc1.width-5,this.pc1.height-35],colCount:8,tag:0,
		            colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Kode DRK","Nama DRK","Periode","Nilai"],
					colWidth:[[7,6,5,4,3,2,1,0],[100,80,150,80,150,80,150,80]],
					readOnly:true,					
					colFormat:[[7],[cfNilai]],
					nilaiChange:[this,"doNilaiChange"],
					checkItem:true,autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg2});		
						
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
			
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='GARAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");
							  
			this.cb_akunD.setSQL("select distinct a.kode_akun, a.nama from masakun a inner join anggaran_d b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
			                     "where b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Data Akun Donor",true);
			
			if (this.app._lokasi == "99") var bidang = " and kode_bidang ="+this.app._kodeBidang;
			else {
				var bidang = " ";
				var data = this.dbLib.getDataProvider("select nik from karyawan where jabatan='ASMANKUG' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];							
					if (line.nik != this.app._userLog) {
						system.alert(this,"Akses hanya untuk ASMANKUG.","Login tidak berhak.");
						setTipeButton(tbAllFalse);	
					}
				}
			}
			
			this.cb_ppD.setSQL("select kode_pp, nama from pp where kode_lokasi='"+this.app._lokasi+"' "+bidang+" ",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_ppT.setSQL("select kode_pp, nama from pp where kode_lokasi='"+this.app._lokasi+"' "+bidang+" ",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_gar_fRRajuArea.extend(window.childForm);
window.app_saku2_transaksi_gar_fRRajuArea.implement({
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"anggaran_m","no_agg",this.app._lokasi+"-RR"+this.e_periode.getText().substr(2,4)+".","000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("insert into anggaran_m (no_agg,kode_lokasi,no_dokumen,tanggal,keterangan,tahun,kode_curr,nilai,tgl_input,nik_user,posted,no_del,nik_buat,nik_setuju,jenis) values  "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.e_periode.getText().substr(0,4)+"','IDR',"+parseNilai(this.e_debet.getText())+",getdate(),'"+this.app._userLog+"','T','-','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','RR')");

					sql.add("insert into rra_pdrk_m(no_pdrk,kode_lokasi,keterangan,kode_pp,kode_bidang,jenis_agg,tanggal,periode,nik_buat,nik_app1,nik_app2,nik_app3,sts_pdrk,justifikasi, nik_user, tgl_input,progress) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','-','-','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"','"+this.app._userLog+"','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','"+this.cb_app.getText()+"','RRR','-','"+this.app._userLog+"',getdate(),'1')");
							
					var periode ="";
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								periode = this.e_periode.getText().substr(0,4)+this.sg.cells(6,i);
								sql.add("insert into rra_pdrk_d(no_pdrk,kode_lokasi,no_urut,kode_akun,kode_pp,kode_drk,periode,saldo,nilai,dc,target) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(4,i)+"','"+periode+"',"+parseNilai(this.sg.cells(7,i))+","+parseNilai(this.sg.cells(8,i))+",'C','-')");
								sql.add("insert into anggaran_d (no_agg,kode_lokasi,no_urut,kode_pp,kode_akun,kode_drk,volume,periode,nilai_sat,nilai,dc,satuan,nik_user,tgl_input,modul) values "+		
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg.cells(2,i)+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(4,i)+"',1,'"+periode+"',"+parseNilai(this.sg.cells(8,i))+","+parseNilai(this.sg.cells(8,i))+",'C','-','"+this.app._userLog+"',getdate(),'RRABPCC')");
							}
						}
					}
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								periode = this.e_periode.getText().substr(0,4)+this.sg2.cells(6,i);
								sql.add("insert into rra_pdrk_d(no_pdrk,kode_lokasi,no_urut,kode_akun,kode_pp,kode_drk,periode,saldo,nilai,dc,target) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg2.cells(0,i)+"','"+this.sg2.cells(2,i)+"','"+this.sg2.cells(4,i)+"','"+periode+"',0,"+parseNilai(this.sg2.cells(7,i))+",'D','-')");
								sql.add("insert into anggaran_d (no_agg,kode_lokasi,no_urut,kode_pp,kode_akun,kode_drk,volume,periode,nilai_sat,nilai,dc,satuan,nik_user,tgl_input,modul) values "+		
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg2.cells(2,i)+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(4,i)+"',1,'"+periode+"',"+parseNilai(this.sg2.cells(7,i))+","+parseNilai(this.sg2.cells(7,i))+",'D','-','"+this.app._userLog+"',getdate(),'RRABPCC')");
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
					setTipeButton(tbSimpan);
				break;
			case "simpan" :					
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
					else {						
						if ((this.e_periode.getText().substr(4,2) == "01" || this.e_periode.getText().substr(4,2) == "02" || this.e_periode.getText().substr(4,2) == "03") && this.sg.cells(6,i)!="01" && this.sg.cells(6,i)!="02" && this.sg.cells(6,i)!="03") {
							system.alert(this,"Transaksi tidak valid.","Periode donor tidak dalam satu triwulan dengan periode transaksi.");
							return false;
						}
						if ((this.e_periode.getText().substr(4,2) == "04" || this.e_periode.getText().substr(4,2) == "05" || this.e_periode.getText().substr(4,2) == "06") && this.sg.cells(6,i)!="04" && this.sg.cells(6,i)!="05" && this.sg.cells(6,i)!="06") {
							system.alert(this,"Transaksi tidak valid.","Periode donor tidak dalam satu triwulan dengan periode transaksi.");
							return false;
						}
						if ((this.e_periode.getText().substr(4,2) == "07" || this.e_periode.getText().substr(4,2) == "08" || this.e_periode.getText().substr(4,2) == "09") && this.sg.cells(6,i)!="07" && this.sg.cells(6,i)!="08" && this.sg.cells(6,i)!="09") {
							system.alert(this,"Transaksi tidak valid.","Periode donor tidak dalam satu triwulan dengan periode transaksi.");
							return false;
						}
						if ((this.e_periode.getText().substr(4,2) == "10" || this.e_periode.getText().substr(4,2) == "11" || this.e_periode.getText().substr(4,2) == "12") && this.sg.cells(6,i)!="10" && this.sg.cells(6,i)!="11" && this.sg.cells(6,i)!="12") {
							system.alert(this,"Transaksi tidak valid.","Periode donor tidak dalam satu triwulan dengan periode transaksi.");
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
					else {						
						if ((this.e_periode.getText().substr(4,2) == "01" || this.e_periode.getText().substr(4,2) == "02" || this.e_periode.getText().substr(4,2) == "03") && this.sg2.cells(6,i)!="01" && this.sg2.cells(6,i)!="02" && this.sg2.cells(6,i)!="03") {
							system.alert(this,"Transaksi tidak valid.","Periode penerima tidak dalam satu triwulan dengan periode transaksi.");
							return false;
						}
						if ((this.e_periode.getText().substr(4,2) == "04" || this.e_periode.getText().substr(4,2) == "05" || this.e_periode.getText().substr(4,2) == "06") && this.sg2.cells(6,i)!="04" && this.sg2.cells(6,i)!="05" && this.sg2.cells(6,i)!="06") {
							system.alert(this,"Transaksi tidak valid.","Periode penerima tidak dalam satu triwulan dengan periode transaksi.");
							return false;
						}
						if ((this.e_periode.getText().substr(4,2) == "07" || this.e_periode.getText().substr(4,2) == "08" || this.e_periode.getText().substr(4,2) == "09") && this.sg2.cells(6,i)!="07" && this.sg2.cells(6,i)!="08" && this.sg2.cells(6,i)!="09") {
							system.alert(this,"Transaksi tidak valid.","Periode penerima tidak dalam satu triwulan dengan periode transaksi.");
							return false;
						}
						if ((this.e_periode.getText().substr(4,2) == "10" || this.e_periode.getText().substr(4,2) == "11" || this.e_periode.getText().substr(4,2) == "12") && this.sg2.cells(6,i)!="10" && this.sg2.cells(6,i)!="11" && this.sg2.cells(6,i)!="12") {
							system.alert(this,"Transaksi tidak valid.","Periode penerima tidak dalam satu triwulan dengan periode transaksi.");
							return false;
						}						
					}
				}
				
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i)){																							
						for (var j=i;j < this.sg.getRowCount();j++){
							if ((this.sg.cells(0,j)+this.sg.cells(2,j)+this.sg.cells(4,j)+this.sg.cells(6,j)) == (this.sg.cells(0,i)+this.sg.cells(2,i)+this.sg.cells(4,i)+this.sg.cells(6,i)) && (i != j)) {
							    var k = i+1;
								system.alert(this,"Transaksi tidak valid.","Duplikasi data untuk baris ["+k+"]");
								return false;
							}
						}
					}
				}
								
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg.validasi();
				if (nilaiToFloat(this.e_kredit.getText()) != nilaiToFloat(this.e_debet.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total Debet dan Kredit tidak sama.");
					return false;						
				}
				if (nilaiToFloat(this.e_kredit.getText()) <= 0 || nilaiToFloat(this.e_debet.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total Debet dan Kredit tidak boleh nol atau kurang.");
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
			case "ubah" :	
				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else this.e_periode.setText(this.app._periode);
		if (this.e_periode.getText().substr(4,2) == "01" || this.e_periode.getText().substr(4,2) == "02" || this.e_periode.getText().substr(4,2) == "03") {
			this.c_bulanD.addItem(0,"01");
			this.c_bulanD.addItem(1,"02");
			this.c_bulanD.addItem(2,"03");
		}
		if (this.e_periode.getText().substr(4,2) == "04" || this.e_periode.getText().substr(4,2) == "05" || this.e_periode.getText().substr(4,2) == "06") {
			this.c_bulanD.addItem(0,"04");
			this.c_bulanD.addItem(1,"05");
			this.c_bulanD.addItem(2,"06");
		}
		if (this.e_periode.getText().substr(4,2) == "07" || this.e_periode.getText().substr(4,2) == "08" || this.e_periode.getText().substr(4,2) == "09") {
			this.c_bulanD.addItem(0,"07");
			this.c_bulanD.addItem(1,"08");
			this.c_bulanD.addItem(2,"09");
		}
		if (this.e_periode.getText().substr(4,2) == "10" || this.e_periode.getText().substr(4,2) == "11" || this.e_periode.getText().substr(4,2) == "12") {
			this.c_bulanD.addItem(0,"10");
			this.c_bulanD.addItem(1,"11");
			this.c_bulanD.addItem(2,"12");
		}		
		if (this.e_periode.getText().substr(4,2) == "01" || this.e_periode.getText().substr(4,2) == "02" || this.e_periode.getText().substr(4,2) == "03") {
			this.c_bulanT.addItem(0,"01");
			this.c_bulanT.addItem(1,"02");
			this.c_bulanT.addItem(2,"03");
		}		
		if (this.e_periode.getText().substr(4,2) == "04" || this.e_periode.getText().substr(4,2) == "05" || this.e_periode.getText().substr(4,2) == "06") {
			this.c_bulanT.addItem(0,"04");
			this.c_bulanT.addItem(1,"05");
			this.c_bulanT.addItem(2,"06");
		}
		if (this.e_periode.getText().substr(4,2) == "07" || this.e_periode.getText().substr(4,2) == "08" || this.e_periode.getText().substr(4,2) == "09") {
			this.c_bulanT.addItem(0,"07");
			this.c_bulanT.addItem(1,"08");
			this.c_bulanT.addItem(2,"09");
		}
		if (this.e_periode.getText().substr(4,2) == "10" || this.e_periode.getText().substr(4,2) == "11" || this.e_periode.getText().substr(4,2) == "12") {
			this.c_bulanT.addItem(0,"10");
			this.c_bulanT.addItem(1,"11");
			this.c_bulanT.addItem(2,"12");
		}
		
		this.e_nb.setText("");		
		this.cb_drkT.setSQL("select kode_drk, nama from drk where kode_lokasi='"+this.app._lokasi+"' and tahun ='"+this.e_periode.getText().substr(0,4)+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true);
	},	
	doChange:function(sender){				
		if (sender == this.cb_akunD || sender == this.cb_ppD ) {
			this.e_saldo.setText("0");						
			if (this.cb_akunD.getText()!="" && this.cb_ppD.getText()!=""){			
				var strSQL = "select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.cb_akunD.getText()+"' and b.kode_pp = '"+this.cb_ppD.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";				
				this.cb_drkD.setSQL(strSQL,["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK Donor",true);				
				var strSQL = "select kode_protek from akun_protek where kode_akun='"+this.cb_akunD.getText()+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						var kodeProtek = line.kode_protek;
					}
				}				
				strSQL = "select a.kode_akun,a.nama from masakun a inner join akun_protek b on a.kode_akun=b.kode_akun "+
				         "where a.kode_lokasi='"+this.app._lokasi+"' and b.kode_protek='"+kodeProtek+"' ";
				this.cb_akunT.setSQL(strSQL,["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Data Akun",true);
			}
		}
		
		if (sender == this.c_bulanD || sender == this.cb_drkD || sender == this.cb_ppD || sender == this.cb_akunD) {
			this.e_saldo.setText("0");
			if (this.cb_akunD.getText()!="" && this.cb_ppD.getText()!="" && this.cb_drkD.getText()!="" && this.c_bulanD.getText()!="") {
				var data = this.dbLib.getDataProvider("select fn_cekaggBulan('"+this.cb_ppD.getText()+"','"+this.app._lokasi+"','"+this.cb_akunD.getText()+"','"+this.cb_drkD.getText()+"','"+this.e_periode.getText().substr(0,4)+this.c_bulanD.getText()+"') as gar ",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];
					data = line.gar.split(";");
					sls = parseFloat(data[0]) - parseFloat(data[1]);
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
			if (this.sg.cells(0,0) == "") this.sg.clear();
			if (this.sg2.cells(0,0) == "") this.sg2.clear();			
			this.sg.appendData([this.cb_akunD.getText(),this.cb_akunD.rightLabelCaption,this.cb_ppD.getText(),this.cb_ppD.rightLabelCaption,this.cb_drkD.getText(),this.cb_drkD.rightLabelCaption,this.c_bulanD.getText(),this.e_saldo.getText(),this.e_nilai.getText()]);  
			this.sg2.appendData([this.cb_akunT.getText(),this.cb_akunT.rightLabelCaption,this.cb_ppT.getText(),this.cb_ppT.rightLabelCaption,this.cb_drkT.getText(),this.cb_drkT.rightLabelCaption,this.c_bulanT.getText(),this.e_nilai.getText()]);							
			
			this.e_saldo.setText("0");
			this.e_nilai.setText("0");			
			this.sg.validasi();			
		}
	},
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"anggaran_m","no_agg",this.app._lokasi+"-RR"+this.e_periode.getText().substr(2,4)+".","000"));
		this.e_dok.setFocus();
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
							system.info(this,"Transaksi telah sukses tersimpan (No Bukti : "+ this.e_nb.getText()+")","");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;	      			
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});