window.app_saku3_transaksi_klinik_fReturJual = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_klinik_fReturJual.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_klinik_fReturJual";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Retur Penjualan Obat: Input", 0);	
				
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",readOnly:true,tag:2});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["List Retur","Data Transaksi"]});				
		this.sg3 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:4,tag:9,
		            colTitle:["No Bukti","Tanggal","Dokumen","Deskripsi"],
					colWidth:[[3,2,1,0],[600,180,80,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[1],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[1],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[1],{bound:[790,12,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_dok = new portalui_saiLabelEdit(this.pc2.childPage[1],{bound:[20,13,300,20],caption:"No Dokumen", maxLength:100});				
		this.e_diskon = new saiLabelEdit(this.pc2.childPage[1],{bound:[790,13,200,20],caption:"Diskon", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});		
		this.e_ket = new portalui_saiLabelEdit(this.pc2.childPage[1],{bound:[20,14,500,20],caption:"Keterangan", maxLength:150});				
		this.e_ppn = new saiLabelEdit(this.pc2.childPage[1],{bound:[790,14,200,20],caption:"Nilai PPN", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});		
		this.cb_vendor = new portalui_saiCBBL(this.pc2.childPage[1],{bound:[20,15,200,20],caption:"Vendor",multiSelection:false,tag:1});
		this.e_mat = new saiLabelEdit(this.pc2.childPage[1],{bound:[790,15,200,20],caption:"Materai", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});		
		this.cb_gudang = new portalui_saiCBBL(this.pc2.childPage[1],{bound:[20,16,200,20],caption:"Gudang",multiSelection:false,tag:1});
		this.e_total = new saiLabelEdit(this.pc2.childPage[1],{bound:[790,16,200,20],caption:"Total+", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.pc1 = new pageControl(this.pc2.childPage[1],{bound:[5,12,990,280], childPage:["Data Item Barang"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:10,tag:0,
		            colTitle:["Nama","Kode","No Batch","Exp Date","Satuan","Harga","Jumlah","Bonus","Tot Diskon","SubTtl"],					
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[80,60,60,60,60,50,100,100,80,280]],					
					columnReadOnly:[true,[0,1,2,3,4,5],[6,7,8,9]],					
					buttonStyle:[[0,2],[bsEllips,bsEllips]], 
					colFormat:[[5,6,7,8,9],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
					ellipsClick:[this,"doEllipseClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[1].rearrangeChild(10, 23);	
		
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
			
			this.ppGudang = "";			
			var data = this.dbLib.getDataProvider("select kode_pp from kli_klinik_user where kode_lokasi='"+this.app._lokasi+"' and nik='"+this.app._userLog+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.ppGudang = line.kode_pp;
			}						
			if (this.app._userStatus == "A") this.cb_gudang.setSQL("select kode_pp, nama from kli_pp where flag_aktif='1' and kode_lokasi = '"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Gudang",true);
			else this.cb_gudang.setSQL("select kode_pp, nama from kli_pp where kode_pp='"+this.ppGudang+"' and flag_aktif='1' and kode_lokasi = '"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Gudang",true);						
			this.cb_gudang.setText(this.ppGudang);			
			
			this.cb_vendor.setSQL("select kode_vendor, nama from kli_vendor where kode_lokasi = '"+this.app._lokasi+"'",["kode_vendor","nama"],false,["Kode","Nama"],"and","Data Vendor",true);
					
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('OBTMAT','PPNM','OBTHUT','OBTINV','OBTDIS') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];					
					if (line.kode_spro == "PPNM") this.akunPPN = line.flag;								
					if (line.kode_spro == "OBTHUT") this.akunHutang = line.flag;			
					if (line.kode_spro == "OBTINV") this.akunBarang = line.flag;			
					if (line.kode_spro == "OBTDIS") this.akunDiskon = line.flag;			
					if (line.kode_spro == "OBTMAT") this.akunMat = line.flag;						
				}
			}			
			
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_klinik_fReturJual.extend(window.portalui_childForm);
window.app_saku3_transaksi_klinik_fReturJual.implement({	
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					if (this.stsSimpan == 1) this.doClick();
					if (this.stsSimpan == 0) {
						sql.add("delete from kli_beli_m where no_beli = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kli_beli_j where no_beli = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kli_beli_d where no_beli = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					sql.add("insert into kli_beli_m(no_beli,kode_lokasi,tanggal,no_dokumen,keterangan,kode_pp,periode,nik_user,tgl_input,nilai,nilai_ppn,nilai_diskon,nilai_mat,kode_vendor,no_kas,posted,modul,akun_hutang) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+this.cb_gudang.getText()+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),"+nilaiToFloat(this.e_total.getText())+","+nilaiToFloat(this.e_ppn.getText())+","+nilaiToFloat(this.e_diskon.getText())+","+nilaiToFloat(this.e_mat.getText())+",'"+this.cb_vendor.getText()+"','-','F','NON','"+this.akunHutang+"')");
							
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){															
								var diskonBrg = nilaiToFloat(this.sg.cells(8,i)) / nilaiToFloat(this.sg.cells(6,i));
								sql.add("insert into kli_beli_d (no_beli,kode_lokasi,periode,nu,kode_obat,kode_pp,satuan,jumlah,bonus,harga,diskon,tot_diskon,total) values "+  
									   "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"',"+i+",'"+this.sg.cells(1,i)+"','"+this.cb_gudang.getText()+"','"+this.sg.cells(4,i)+"',"+nilaiToFloat(this.sg.cells(6,i))+","+nilaiToFloat(this.sg.cells(7,i))+","+nilaiToFloat(this.sg.cells(5,i))+","+diskonBrg+","+nilaiToFloat(this.sg.cells(8,i))+","+nilaiToFloat(this.sg.cells(9,i))+")");
							}
						}						
					}
										
					sql.add("insert into kli_beli_j(no_beli,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.akunBarang+"','"+this.e_ket.getText()+"','D',"+this.barang+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','BRGBELI','BRG','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");					
					sql.add("insert into kli_beli_j(no_beli,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',1,'"+this.akunPPN+"','"+this.e_ket.getText()+"','D',"+nilaiToFloat(this.e_ppn.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','BRGBELI','PPN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");					
					sql.add("insert into kli_beli_j(no_beli,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',5,'"+this.akunMat+"','"+this.e_ket.getText()+"','D',"+nilaiToFloat(this.e_mat.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','BRGBELI','BEAMAT','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
							
					var totDiskon = nilaiToFloat(this.e_diskon.getText()) + this.diskon;
					sql.add("insert into kli_beli_j(no_beli,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',2,'"+this.akunDiskon+"','"+this.e_ket.getText()+"','C',"+totDiskon+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','BRGBELI','DIS','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
					sql.add("insert into kli_beli_j(no_beli,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',3,'"+this.akunDiskon+"','"+this.e_ket.getText()+"','C',"+this.bonus+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','BRGBELI','BONUS','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");									
					sql.add("insert into kli_beli_j(no_beli,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',4,'"+this.akunHutang+"','"+this.e_ket.getText()+"','C',"+nilaiToFloat(this.e_total.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','BRGBELI','HUT','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
										
					sql.add("insert into kli_beli_j(no_beli,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) "+
							"select "+
							"no_beli,'-','"+this.dp_d1.getDateString()+"','99','"+this.akunDiskon+"','SLS', case when (debet-kredit)>0 then 'C' else 'D' end,abs(debet-kredit),'"+this.app._kodePP+"','-','"+this.app._lokasi+"','BRGBELI','SLS','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1 "+
							"from "+
							"( "+
							"    select no_beli,kode_lokasi, "+
							"    sum(case dc when 'D' then nilai else 0 end) as debet, "+
							"    sum(case dc when 'C' then nilai else 0 end) as kredit "+
							"    from kli_beli_j where no_beli='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
							"    group by no_beli,kode_lokasi "+
							")a where a.debet <> a.kredit and a.no_beli='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
																			
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg.clear(1); 
					this.pc2.setActivePage(this.pc2.childPage[0]);
					this.doLoad3();
					setTipeButton(tbAllFalse);
				}
				break;
			case "simpan" :	
			case "ubah" :	
				this.preView = "1";
			    for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i)){
						for (var j=i;j < this.sg.getRowCount();j++){
							if (this.sg.cells(1,j) == this.sg.cells(1,i) && (i != j)) {
							    var k = i+1;
								system.alert(this,"Transaksi tidak valid.","Duplikasi data barang untuk baris ["+k+"]");
								return false;
							}
						}
					}
				}
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					systemAPI.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())) {
					if (this.app._pernext == "1")
					  system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
					else{
						systemAPI.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
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
					sql.add("delete from kli_beli_m where no_beli = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from kli_beli_j where no_beli = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from kli_beli_d where no_beli = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;									
		}
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {					
				this.sg.clear(1);
				if (this.app._userStatus == "A") this.cb_gudang.setSQL("select kode_pp, nama from kli_pp where flag_aktif='1' and kode_lokasi = '"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Gudang",true);
				else this.cb_gudang.setSQL("select kode_pp, nama from kli_pp where kode_pp='"+this.ppGudang+"' and flag_aktif='1' and kode_lokasi = '"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Gudang",true);						
				this.cb_gudang.setText(this.ppGudang);						
				this.cb_vendor.setSQL("select kode_vendor, nama from kli_vendor where kode_lokasi = '"+this.app._lokasi+"'",["kode_vendor","nama"],false,["Kode","Nama"],"and","Data Vendor",true);
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kli_beli_m","no_beli",this.app._lokasi+"-RT"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_dok.setFocus();
			setTipeButton(tbSimpan);			
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
		this.doLoad3();		
	},
	doEllipseClick: function(sender, col, row){
		try{			
			if (col == 0){
				this.standarLib.showListData(this, "Daftar Item Obat",sender,undefined, 
											  "select nama,kode_obat from kli_obat where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_obat) from kli_obat where kode_lokasi='"+this.app._lokasi+"'",
											  ["nama","kode_obat"],"and",["Nama","Kode"],false);				
			}

		}catch(e){
			systemAPI.alert(e);
		}
	},
	doChangeCell: function(sender, col, row){
		if ((col == 2 || col == 3) && this.sg.cells(1,row)!="" && this.sg.cells(2,row)!="" && this.sg.cells(3,row)!="") {															
			var strSQL = "select a.sat_kecil,a.hna "+
						 "from kli_obat a "+
						 "where a.kode_obat='"+this.sg.cells(1,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";						 						
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
					this.sg.cells(4,row,line.sat_kecil);							
					this.sg.cells(5,row,parseFloat(line.hna));	
					this.sg.cells(6,row,"0");						
					this.sg.cells(7,row,"0");
					this.sg.cells(8,row,"0");
					this.sg.cells(9,row,"0");
				} 				
			}			
		}		
		if (col == 9 || col == 6 || col == 8) {
			if (this.sg.cells(9,row) != "" && this.sg.cells(8,row) != "" && this.sg.cells(6,row) != "" && this.sg.cells(6,row) != "0" && this.sg.cells(9,row) != "0") {				
				this.sg.cells(5,row,parseFloat((nilaiToFloat(this.sg.cells(9,row))+nilaiToFloat(this.sg.cells(8,row))) / nilaiToFloat(this.sg.cells(6,row))));
			}
		}		
		this.sg.validasi();
	},
	doNilaiChange: function(){
		try{
			this.barang = this.bonus = this.diskon = 0;
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(9,i) != ""){
					tot += nilaiToFloat(this.sg.cells(9,i));					
					this.barang += Math.round( nilaiToFloat(this.sg.cells(5,i)) * (nilaiToFloat(this.sg.cells(6,i))+nilaiToFloat(this.sg.cells(7,i))) );
					this.diskon += Math.round(nilaiToFloat(this.sg.cells(8,i)));
					this.bonus += Math.round(nilaiToFloat(this.sg.cells(5,i)) * nilaiToFloat(this.sg.cells(7,i)));
				}
			}
			this.e_nilai.setText(floatToNilai(tot));
			this.e_total.setText(floatToNilai(tot-nilaiToFloat(this.e_diskon.getText())+nilaiToFloat(this.e_ppn.getText())+nilaiToFloat(this.e_mat.getText())));	
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doChange:function(sender){
		if (sender == this.e_ppn || sender == this.e_nilai || sender == this.e_diskon || sender == this.e_mat) {
			if (sender == this.e_diskon && this.e_diskon.getText()!="") 
				this.e_ppn.setText(floatToNilai(Math.round((nilaiToFloat(this.e_nilai.getText())-nilaiToFloat(this.e_diskon.getText()))*10/100)));
			if (this.e_nilai.getText()!="" && this.e_ppn.getText()!="" && this.e_diskon.getText()!="" && this.e_mat.getText()!="") {
				this.e_total.setText(floatToNilai(nilaiToFloat(this.e_nilai.getText())-nilaiToFloat(this.e_diskon.getText())+nilaiToFloat(this.e_ppn.getText())+nilaiToFloat(this.e_mat.getText())));
			}
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku2_gl_rptBuktiJurnal";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_beli='"+this.e_nb.getText()+"' ";
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
								this.pc2.hide();
							} 
							else {
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
								this.clearLayar();
							} 
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
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																		
		var strSQL = "select a.no_beli,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.keterangan "+
		             "from kli_beli_m a "+					 					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.posted ='F'";		
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
			this.sg3.appendData([line.no_beli,line.tgl,line.no_dokumen,line.keterangan]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[1]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
								
				var strSQL = "select no_dokumen,keterangan,kode_vendor,kode_pp,nilai_ppn,nilai_diskon,nilai_mat "+
							 "from kli_beli_m "+							 
							 "where no_beli = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.e_dok.setText(line.no_dokumen);					
						this.e_ket.setText(line.keterangan);												
						this.e_diskon.setText(floatToNilai(line.nilai_diskon));												
						this.e_ppn.setText(floatToNilai(line.nilai_ppn));												
						this.e_mat.setText(floatToNilai(line.nilai_mat));												
						this.cb_gudang.setSQL("select kode_pp, nama from kli_pp where kode_pp='"+line.kode_pp+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Gudang",true);									
						this.cb_vendor.setSQL("select kode_vendor, nama from kli_vendor where kode_vendor='"+line.kode_vendor+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_vendor","nama"],false,["Kode","Nama"],"and","Data Vendor",true);									
						this.cb_gudang.setText(line.kode_pp);						
						this.cb_vendor.setText(line.kode_vendor);												
					}
				}												
				var data = this.dbLib.getDataProvider("select b.kode_obat,b.nama,a.no_batch,convert(varchar,a.tgl_ed,103) as tgl_ed,a.satuan,a.jumlah,a.bonus,a.harga,a.tot_diskon,a.total "+
							"from kli_beli_d a inner join kli_obat b on a.kode_obat=b.kode_obat and a.kode_lokasi=b.kode_lokasi "+
							"where a.no_beli = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg.appendData([line.nama,line.kode_obat,line.no_batch,line.tgl_ed,line.satuan,floatToNilai(line.harga),floatToNilai(line.jumlah),floatToNilai(line.bonus),floatToNilai(line.tot_diskon),floatToNilai(line.total)]);
					}
				} else this.sg.clear(1);							
			}									
		} catch(e) {alert(e);}
	}
});