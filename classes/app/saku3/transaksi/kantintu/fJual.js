window.app_saku3_transaksi_kantintu_fJual = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_kantintu_fJual.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_kantintu_fJual";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penjualan Barang: Input", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",readOnly:true,tag:2});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]});
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Transaksi","List Penjualan"]});				
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:2,tag:9,
		            colTitle:["No Bukti","Tanggal"],
					colWidth:[[1,0],[80,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[730,12,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.cb_gudang = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"Gudang",multiSelection:false,tag:2,change:[this,"doChange"]});
		this.e_diskon = new saiLabelEdit(this.pc2.childPage[0],{bound:[730,13,200,20],caption:"Diskon", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});		
		this.c_status = new saiCB(this.pc2.childPage[0],{bound:[20,14,200,20],caption:"Status",items:["TUNAI","CREDIT"], readOnly:true,tag:2,change:[this,"doChange"]});				
		this.e_ppn = new saiLabelEdit(this.pc2.childPage[0],{bound:[730,14,200,20],caption:"Nilai PPN", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});		
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[730,15,200,20],caption:"Total+", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
				
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,12,990,260], childPage:["Data Item Obat"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:10,tag:0,
		            colTitle:["Kode","Nama Barang","Satuan","Stok","Harga","% Disk","N. Diskon","Jumlah","Bonus","SubTtl"],					
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[100,70,60,70,60,100,80,80,80,200]],					
					columnReadOnly:[true,[1,2,3,4],[0,5,6,7,8,9]],
					colFormat:[[3,4,5,6,7,8,9],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
					buttonStyle:[[0],[bsEllips]], 					
					ellipsClick:[this,"doEllipseClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		
				
		this.rearrangeChild(10, 22);
		this.pc2.childPage[0].rearrangeChild(10, 23);		
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('BRGPIU','BPPNM','BRGPDPT','BRGPOT','BRGDIS') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];					
					if (line.kode_spro == "BPPNM") this.akunPPN = line.flag;								
					if (line.kode_spro == "BRGPIU") this.akunPiutang = line.flag;			
					if (line.kode_spro == "BRGPDPT") this.akunPdpt = line.flag;			
					if (line.kode_spro == "BRGPOT") this.akunPot = line.flag;						
				}
			}
			this.ppGudang = "";			
			var data = this.dbLib.getDataProvider("select kode_kantin from ktu_kantin where kode_lokasi='"+this.app._lokasi+"' ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.ppGudang = line.kode_pp;
			}			
			if (this.app._userStatus == "A") this.cb_gudang.setSQL("select kode_kantin, nama from ktu_kantin where  kode_lokasi = '"+this.app._lokasi+"'",["kode_kantin","nama"],false,["Kode","Nama"],"and","Data Gudang",true);
			else this.cb_gudang.setSQL("select kode_kantin, nama from ktu_kantin where kode_kantin='"+this.ppGudang+"' and kode_lokasi = '"+this.app._lokasi+"'",["kode_kantin","nama"],false,["Kode","Nama"],"and","Data Gudang",true);			
			this.cb_gudang.setText(this.ppGudang);
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('BRGMAT','BPPNM','BRGHUT','BRGINV','BRGDIS') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];					
					if (line.kode_spro == "BPPNM") this.akunPPN = line.flag;								
					if (line.kode_spro == "BRGHUT") this.akunHutang = line.flag;			
					if (line.kode_spro == "BRGINV") this.akunBarang = line.flag;			
					if (line.kode_spro == "BRGDIS") this.akunDiskon = line.flag;			
					if (line.kode_spro == "BRGMAT") this.akunMat = line.flag;						
				}
			}
			this.stsPPN = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);									
			this.c_status.setText("TUNAI");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_kantintu_fJual.extend(window.portalui_childForm);
window.app_saku3_transaksi_kantintu_fJual.implement({
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
			this.nik_user=this.app._userLog;						
			var sql = "call sp_kli_stok ('"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.nik_user+"')";
			this.dbLib.execQuerySync(sql);	
			
			for (var i=0;i < this.sg.getRowCount();i++){
				if (this.sg.rowValid(i)){
					if (nilaiToFloat(this.sg.cells(3,i)) < (nilaiToFloat(this.sg.cells(7,i))+nilaiToFloat(this.sg.cells(8,i)))) {
						var k = i+1;
						system.alert(this,"Transaksi tidak valid.","Jumlah melebihi Stok ["+k+"]");
						return false;						
					}
					
				}
			}
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{																
					if (this.stsSimpan == 1) this.doClick();					
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();										
					if (this.stsSimpan == 0) {
						sql.add("delete from kli_jual_m where no_jual = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kli_jual_d where no_jual = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}	

					var totDiskon = nilaiToFloat(this.e_diskon.getText()) + this.diskon;					
					sql.add("insert into kli_jual_m(no_jual,kode_lokasi,tanggal,due_date,no_dokumen,kode_pic,keterangan,kode_pp,periode,nik_user,tgl_input,nilai,nilai_ppn,nilai_diskon,kode_cust,no_kas,posted,modul,akun_piutang,sts_jual) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.dp_d1.getDateString()+"','-','-','Penjualan No: "+this.e_nb.getText()+"','"+this.cb_gudang.getText()+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),"+nilaiToFloat(this.e_total.getText())+","+nilaiToFloat(this.e_ppn.getText())+","+nilaiToFloat(this.e_diskon.getText())+",'-','-','F','UMUM','"+this.akunPiutang+"','"+this.c_status.getText()+"')");
					
					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','KB','BLBRG','F','-','-','"+this.dp_d1.getDateString()+"','-','Penjualan No: "+this.e_nb.getText()+"','IDR',1,"+
							parseNilai(this.e_total.getText())+",0,0,'-','-','-','-','-','-')");
					
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.akunPiutang+"','D',"+nilaiToFloat(this.e_total.getText())+","+nilaiToFloat(this.e_total.getText())+",'Penjualan No :"+this.e_nb.getText()+"','BRGJUAL','PIU','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");										
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',1,'"+this.akunPot+"','D',"+totDiskon+","+totDiskon+",'Penjualan No :"+this.e_nb.getText()+"','BRGJUAL','POT','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");										
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',2,'"+this.akunPdpt+"','C',"+this.jualbruto+","+this.jualbruto+",'Penjualan No :"+this.e_nb.getText()+"','BRGJUAL','PDPT','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");										
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',3,'"+this.akunPPN+"','C',"+nilaiToFloat(this.e_ppn.getText())+","+nilaiToFloat(this.e_ppn.getText())+",'Penjualan No :"+this.e_nb.getText()+"','BRGJUAL','PPN','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");										
										
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){																																										
								sql.add("insert into kli_jual_d(no_jual,kode_lokasi,periode,nu,kode_obat,kode_pp,satuan,jumlah,bonus,harga,hpp,diskon,p_disk) values "+  
									    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.cb_gudang.getText()+"','"+this.sg.cells(2,i)+"',"+nilaiToFloat(this.sg.cells(7,i))+","+nilaiToFloat(this.sg.cells(8,i))+","+nilaiToFloat(this.sg.cells(4,i))+",0,"+nilaiToFloat(this.sg.cells(6,i))+","+nilaiToFloat(this.sg.cells(5,i))+")");
							}
						}						
					}		
					
					this.stsPPN = 1;
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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0"),this.e_nb);		
					this.sg.clear(1);										
				}
				break;
			case "simpan" :	
			case "ubah" :
				this.preView = "1";
				this.stsPPN = 0;							
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())) {
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
			case "hapus" :	
				this.preView = "0";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from kli_jual_m where no_jual = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from kli_jual_d where no_jual = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					

					this.stsPPN = 1;
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;									
		}
	},
	doClick:function(sender){
		try {
			if (this.e_periode.getText()!= "") {
				if (this.stsSimpan == 0) {
					this.sg.clear(1);
					this.stsPPN = 1;
					this.cb_gudang.setSQL("select kode_kantin, nama from ktu_kantin where kode_lokasi = '"+this.app._lokasi+"'",["kode_kantin","nama"],false,["Kode","Nama"],"and","Data Gudang",true);
				}
				this.stsSimpan = 1;
				this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kli_jual_m","no_jual",this.app._lokasi+"-SO"+this.e_periode.getText().substr(2,4)+".","0000"));			
					
				this.cb_gudang.setFocus();
				setTipeButton(tbSimpan);			
			}
		}
		catch(e) {
			alert(e);
		}
	},	
	doSelectDate: function(sender, y,m,d){
		try {
			if (m < 10) m = "0" + m;			
			if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
			else {
				if (m == "12") this.e_periode.setText(this.app._periode);
				else this.e_periode.setText(y+""+m);
			}
			this.periodeBrg = this.e_periode.getText().substr(0,4)+"01";		
			this.nik_user=this.app._userLog;						
			var sql = "call sp_kli_stok ('"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.nik_user+"')";
			this.dbLib.execQuerySync(sql);			
			if (this.stsSimpan == 1) this.doClick();
			this.doLoad3();					
		}catch(e) {alert(e);}
	},
	doEllipseClick: function(sender, col, row){
		try{
			if (col == 0 && this.cb_gudang.getText()!=""){
				this.standarLib.showListData(this, "Daftar Item Barang",sender,undefined, 
											  "select kode_obat,nama from kli_obat where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_obat) from kli_obat where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_obat","nama"],"and",["Kode Obat","Nama"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doChangeCell: function(sender, col, row){
		try {
			if (col == 0 && this.sg.cells(0,row) != "") {		
				if (this.stsSimpan == 1) {
					var strSQL = "select a.nama, a.sat_kecil,a.hna,b.stok "+
								 "from kli_obat a inner join kli_stok b on a.kode_obat=b.kode_obat and a.kode_lokasi=b.kode_lokasi and b.kode_pp='"+this.cb_gudang.getText()+"' and b.nik_user='"+this.app._userLog+"' "+
								 "where a.kode_obat='"+this.sg.cells(0,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";						 			
				}
				else {
					var strSQL = "select a.nama, a.sat_kecil,a.hna,b.stok+isnull(c.jumlah+c.bonus,0) as stok "+
								 "from kli_obat a inner join kli_stok b on a.kode_obat=b.kode_obat and a.kode_lokasi=b.kode_lokasi and b.kode_pp='"+this.cb_gudang.getText()+"' and b.nik_user='"+this.app._userLog+"' "+
								 "                left join kli_jual_d c on b.kode_obat = c.kode_obat and b.kode_lokasi=c.kode_lokasi and c.no_jual='"+this.e_nb.getText()+"' "+
								 "where a.kode_obat='"+this.sg.cells(0,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";
				}
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){		
						this.sg.cells(1,row,line.nama);			
						this.sg.cells(2,row,line.sat_kecil);	
						this.sg.cells(3,row,parseFloat(line.stok));	
						this.sg.cells(4,row,parseFloat(line.hna));	
						this.sg.cells(5,row,"0");						
						this.sg.cells(6,row,"0");
						this.sg.cells(7,row,"0");
						this.sg.cells(8,row,"0");
						this.sg.cells(9,row,"0");
					} 				
				}				
			}
				
			if (col == 4 || col == 5) {
				if (this.sg.cells(4, row) != "" && this.sg.cells(5, row) != "") {
					this.sg.cells(6, row, Math.round(nilaiToFloat(this.sg.cells(5, row)) * nilaiToFloat(this.sg.cells(4, row)) / 100));
				}
			}			
			if (col == 6 || col == 7) {
				if (this.sg.cells(4,row) != "" && this.sg.cells(6,row) != "" && this.sg.cells(7,row) != "") {
					this.sg.cells(9,row,Math.round((nilaiToFloat(this.sg.cells(4,row))-nilaiToFloat(this.sg.cells(6,row))) * nilaiToFloat(this.sg.cells(7,row))));
				}
			}	
			this.sg.validasi();
		} catch(e) {
			alert(e);
		}
	},
	doNilaiChange: function(){
		try{
			this.jualbruto = this.diskon = 0;
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(9,i) != ""){
					tot += nilaiToFloat(this.sg.cells(9,i));					
					this.jualbruto += Math.round(nilaiToFloat(this.sg.cells(4,i)) * nilaiToFloat(this.sg.cells(7,i)));					
					this.diskon += Math.round(nilaiToFloat(this.sg.cells(6,i)) * nilaiToFloat(this.sg.cells(7,i)));					
				}
			}
			this.e_nilai.setText(floatToNilai(tot));			
			if (this.stsPPN == 1) this.e_ppn.setText(floatToNilai(Math.round((nilaiToFloat(this.e_nilai.getText())-nilaiToFloat(this.e_diskon.getText()))*10/100)));
			this.e_total.setText(floatToNilai(tot-nilaiToFloat(this.e_diskon.getText())+nilaiToFloat(this.e_ppn.getText())));	
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doChange:function(sender){		
		try {
			if (sender == this.cb_gudang && this.stsSimpan == 1) {
				this.sg.clear(1);
			}
			if (sender == this.e_ppn || sender == this.e_nilai || sender == this.e_diskon) {
				if (sender == this.e_diskon && this.e_diskon.getText()!="") 
					this.e_ppn.setText(floatToNilai(Math.round((nilaiToFloat(this.e_nilai.getText())-nilaiToFloat(this.e_diskon.getText()))*10/100)));
				if (this.e_nilai.getText()!="" && this.e_ppn.getText()!="" && this.e_diskon.getText()!="") {
					this.e_total.setText(floatToNilai(nilaiToFloat(this.e_nilai.getText())-nilaiToFloat(this.e_diskon.getText())+nilaiToFloat(this.e_ppn.getText())));
				}
			}		
		}
		catch(e) {
			alert(e);
		}
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_kantintu_rptJual";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_jual='"+this.e_nb.getText()+"' ";
								this.filter2 = this.e_periode.getText()+"/"+this.app._lokasi;
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
								this.pc2.hide();
							} 
							else {
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
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
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg.clear(1); 
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.doLoad3();
			setTipeButton(tbAllFalse);			
			this.nik_user=this.app._userLog;						
			var sql = "call sp_kli_stok ('"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.nik_user+"')";
			this.dbLib.execQuerySync(sql);				
		} catch(e) {
			alert(e);
		}
	},	
	doLoad3:function(sender){																		
		if (this.app._userStatus == "A") {
			var strSQL = "select a.no_jual,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen "+
						 "from kli_jual_m a "+					 					 
						 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.posted ='F'";		
		}
		else {
			var strSQL = "select a.no_jual,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen "+
						 "from kli_jual_m a "+					 					 
						 "where kode_pp = '"+this.ppGudang+"' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.posted ='F'";			
		}		
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
			this.sg3.appendData([line.no_jual,line.tgl]); 
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
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.stsPPN = 0;
				this.e_nb.setText(this.sg3.cells(0,row));								
												
				var strSQL = "select * from kli_jual_m "+							 
							 "where no_jual = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){											
						this.c_status.setText(line.sts_jual);											
						this.e_diskon.setText(floatToNilai(line.nilai_diskon));												
						this.e_ppn.setText(floatToNilai(line.nilai_ppn));												
						this.cb_gudang.setSQL("select kode_kantin, nama from ktu_kantin where kode_kantin='"+line.kode_pp+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_kantin","nama"],false,["Kode","Nama"],"and","Data Gudang",true);									
						this.cb_gudang.setText(line.kode_pp);											
					}
				}												
				
				this.nik_user=this.app._userLog;						
				var sql = "call sp_kli_stok ('"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.nik_user+"')";
				this.dbLib.execQuerySync(sql);	
				
				var strSQL = "select a.kode_obat,b.nama,a.satuan,a.jumlah,a.bonus,a.harga,a.diskon,round(a.jumlah * (a.harga-a.diskon),0) as total,c.stok+a.jumlah+a.bonus as stok,a.p_disk "+
							 "from kli_jual_d a inner join kli_obat b on a.kode_obat=b.kode_obat and a.kode_lokasi=b.kode_lokasi "+
							 "                  inner join kli_stok c on a.kode_obat=c.kode_obat and a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi and c.nik_user='"+this.nik_user+"' "+
							 "where a.no_jual='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";										
				var data1 = this.dbLib.getDataProvider(strSQL,true);	
				if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
					var line1;
					this.sg.clear();
					for (var i in data1.rs.rows){
						line1 = data1.rs.rows[i];																													
						this.sg.appendData([line1.nama,line1.kode_obat,line1.satuan,parseFloat(line1.stok),parseFloat(line1.harga),parseFloat(line1.p_disk),parseFloat(line1.diskon),parseFloat(line1.jumlah),parseFloat(line1.bonus),parseFloat(line1.total)]);
					}
				} else this.sg.clear(1);												
				this.sg.validasi();							
			}									
		} catch(e) {alert(e);}
	}
	
});