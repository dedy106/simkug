window.app_saku3_transaksi_tu_kantin_fNota = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_kantin_fNota.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_kantin_fNota";
		this.itemsValue = new arrayList();
		this.maximize();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Nota", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,120,20],caption:"Tanggal", underline:true});	
		this.dp_d1 = new portalui_datePicker(this,{bound:[140,11,100,20],selectDate:[this,"doSelectDate"]});
		
		this.pc1 = new pageControl(this,{bound:[20,12,995,385], childPage:["Data Nota","Daftar Nota"]});				
		this.e_admin = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"User Admin",maxLength:10,tag:9});
		this.e_pwd = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,200,20],caption:"Password",password:true,maxLength:10,tag:9});
		this.e_nota1 = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"No Nota",maxLength:30,tag:9});
		this.bLoad1 = new button(this.pc1.childPage[1],{bound:[225,10,80,18],caption:"Load Data",click:[this,"doLoad"]});			

		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-87],colCount:5,tag:9,visible:false,
		            colTitle:["No. Nota","Deskripsi","Tanggal","Nilai","No. Closing"],
					colWidth:[[4,3,2,1,0],[150,100,100,200,100]],
					colFormat:[[3],[cfNilai]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"],visible:false});
		
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,10,200,20],caption:"No Nota",maxLength:10,change:[this,"doChange"],readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[0],{bound:[225,10,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});										
		
		this.pc2 = new pageControl(this.pc1.childPage[0],{bound:[1,40,710,320], childPage:["Trans. Tenan","Trans. Barang","Non Tunai"]});								
		this.sg3 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:3,tag:9,
		            colTitle:["Kode Tenan","Nama Tenan","Nilai"],					
					colWidth:[[2,1,0],[100,300,120]],					
					columnReadOnly:[true,[1],[0,2]],
					colFormat:[[2],[cfNilai]],
					buttonStyle:[[0],[bsEllips]], 					
					ellipsClick:[this,"doEllipseClick3"],change:[this,"doChangeCell3"],nilaiChange:[this,"doNilaiChange3"],
					autoAppend:true,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sg});		
		
		this.pc3 = new pageControl(this.pc1.childPage[0],{bound:[720,40,265,320], childPage:["  PEMBAYARAN  "]});
		this.e_nilai = new saiLabelEdit(this.pc3.childPage[0],{bound:[20,16,220,40],caption:"Total Tenan", tipeText:ttNilai,text:"0", maxLength:50, tag:9,readOnly:true, change:[this,"doChange"]});
						   this.e_nilai.label.style.fontSize = 16;
						   this.e_nilai.input.style.fontSize = 16;	
						   this.e_nilai.input.style.height = 33;
						   this.e_nilai.label.style.height = 32;

		this.e_totalbrg = new saiLabelEdit(this.pc3.childPage[0],{bound:[20,18,220,40],caption:"Total Barang", tipeText:ttNilai,text:"0",maxLength:50, tag:1, readOnly:true, change:[this,"doChange"]});
						   this.e_totalbrg.label.style.fontSize = 16;
						   this.e_totalbrg.input.style.fontSize = 16;	
						   this.e_totalbrg.input.style.height = 33;
						   this.e_totalbrg.label.style.height = 32;		

		this.e_total = new saiLabelEdit(this.pc3.childPage[0],{bound:[20,20,220,40],caption:"Total Trans.", tipeText:ttNilai,text:"0",maxLength:50, tag:1, readOnly:true, change:[this,"doChange"]});
						   this.e_total.label.style.fontSize = 16;
						   this.e_total.input.style.fontSize = 16;	
						   this.e_total.input.style.height = 33;
						   this.e_total.label.style.height = 32;

		this.e_bayar = new saiLabelEdit(this.pc3.childPage[0],{bound:[20,19,220,40],caption:"Bayar Tunai", tipeText:ttNilai,text:"0",maxLength:50, tag:9,change:[this,"doChange"]});
						   this.e_bayar.label.style.fontSize = 16;
						   this.e_bayar.input.style.fontSize = 16;	
						   this.e_bayar.input.style.height = 33;
						   this.e_bayar.label.style.height = 32;

		this.e_totbayar = new saiLabelEdit(this.pc3.childPage[0],{bound:[20,17,220,40],caption:"Total Bayar", tipeText:ttNilai,text:"0",maxLength:50, tag:9, readOnly:true, change:[this,"doChange"]});
						   this.e_totbayar.label.style.fontSize = 16;
						   this.e_totbayar.input.style.fontSize = 16;	
						   this.e_totbayar.input.style.height = 33;
						   this.e_totbayar.label.style.height = 32;

		this.e_sisa = new saiLabelEdit(this.pc3.childPage[0],{bound:[20,21,220,40],caption:"Sisa Bayar", tipeText:ttNilai,text:"0",maxLength:50, tag:9, readOnly:true});
						   this.e_sisa.label.style.fontSize = 16;
						   this.e_sisa.input.style.fontSize = 16;	
						   this.e_sisa.input.style.height = 33;
						   this.e_sisa.label.style.height = 32;
		
		this.sg = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:6,tag:9,
		            colTitle:["Kode","Nama Barang","Satuan","Harga","Jumlah","Sub Total"],					
					colWidth:[[5,4,3,2,1,0],[100,60,80,60,240,120]],					
					columnReadOnly:[true,[1,2,3,5],[0,4]],
					colFormat:[[3,4,5],[cfNilai,cfNilai,cfNilai]],
					buttonStyle:[[0],[bsEllips]], 					
					ellipsClick:[this,"doEllipseClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sg});		
		
		this.sg2 = new saiGrid(this.pc2.childPage[2],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:4,tag:9,
		            colTitle:["Kode Bayar","Deskripsi","ID Pembayaran","Nilai"],
					colWidth:[[3,2,1,0],[100,200,200,100]],					
					columnReadOnly:[true,[0,1],[2,3]],
					colFormat:[[3],[cfNilai]],
					change:[this,"doChangeCell2"],nilaiChange:[this,"doNilaiChange2"],
					autoAppend:false,defaultRow:1});		
		this.sgn2 = new portalui_sgNavigator(this.pc2.childPage[2],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg2});

		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);			
		this.pc3.childPage[0].rearrangeChild(20, 40);
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
			this.stsSimpan=1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			var data = this.dbLib.getDataProvider("select kode_kantin from ktu_user where kode_lokasi='"+this.app._lokasi+"' and nik='"+this.app._userLog+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){				
					this.kodeKantin = line.kode_kantin;					
				}					
			}	
			
			var sql = new server_util_arrayList();
			sql.add("select kode_tenan,nama from ktu_tenan where kode_kantin='"+this.kodeKantin+"' and kode_lokasi = '"+this.app._lokasi+"'");						
			this.dbLib.getMultiDataProviderA(sql);

			this.doLoadJenisBayar();
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tu_kantin_fNota.extend(window.childForm);
window.app_saku3_transaksi_tu_kantin_fNota.implement({
	doLoadJenisBayar : function() {
		var data = this.dbLib.getDataProvider("select * from ktu_jbayar where kode_lokasi='"+this.app._lokasi+"' and kode_bayar <> 'TUNAI' order by kode_bayar",true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg2.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];												
				this.sg2.appendData([line.kode_bayar,line.ket,"-","0"]);
			}
		} else this.sg2.clear(1);
	},
	doEllipseClick: function(sender, col, row){
		try{
			if (col == 0){
				this.standarLib.showListData(this, "Daftar Item Barang",sender,undefined, 
											  "select kode_barang,nama from ktu_barang where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_barang) from ktu_barang where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_barang","nama"],"and",["Kode Barang","Nama"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},			
	doChangeCell: function(sender, col, row){
		try {
			if (col == 0 && this.sg.cells(0,row) != "") {						
				var strSQL = "select a.nama, a.satuan,a.hjual "+
							"from ktu_barang a "+
							"where a.kode_barang='"+this.sg.cells(0,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){		
						this.sg.cells(1,row,line.nama);			
						this.sg.cells(2,row,line.satuan);	
						this.sg.cells(3,row,parseFloat(line.hjual));	
						this.sg.cells(4,row,"0");
						this.sg.cells(5,row,"0");
					} 				
				}				
			}				
			if (col == 3 || col == 4) {
				if (this.sg.cells(3,row) != "" && this.sg.cells(4,row) != "") {
					this.sg.cells(5,row,  nilaiToFloat(this.sg.cells(3,row))  * nilaiToFloat(this.sg.cells(4,row))  );
				}
			}	
			this.sg.validasi();
		} catch(e) {
			alert(e);
		}
	},
	doNilaiChange: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(5,i) != ""){
					tot += nilaiToFloat(this.sg.cells(5,i));															
				}
			}
			this.e_totalbrg.setText(floatToNilai(tot));						
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doChangeCell3: function(sender, col, row){
		try {
			if (col == 2 && this.sg3.cells(2,row) != "") this.sg3.validasi();			
			sender.onChange.set(undefined,undefined);	    
			if (col == 0) {
				if (this.sg3.cells(0,row) != "") {				
					var tenan = this.dataTenan.get(sender.cells(0,row));				
					if (tenan) sender.cells(1,row,tenan);
					else {                                    
						if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Tenan "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
						sender.cells(0,row,"");
						sender.cells(1,row,"");
					}				
				}
			}							
			sender.onChange.set(this,"doChangeCell3");
		} catch(e) {
			alert(e);
		}
	},
	doEllipseClick3: function(sender, col, row){
		try{
			if (col == 0){
				this.standarLib.showListData(this, "Daftar Tenan",sender,undefined, 
											  "select kode_tenan,nama from ktu_tenan where kode_kantin='"+this.kodeKantin+"' and kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_tenan) from ktu_tenan where kode_kantin='"+this.kodeKantin+"' and kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_tenan","nama"],"and",["Kode Tenan","Nama"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doNilaiChange3: function(){
		try{
			var tot2 = 0;
			for (var i = 0; i < this.sg3.rows.getLength();i++){
				if (this.sg3.rowValid(i) && this.sg3.cells(2,i) != ""){
					tot2 += nilaiToFloat(this.sg3.cells(2,i));															
				}
			}
			this.e_nilai.setText(floatToNilai(tot2));						
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
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
			if (this.stsSimpan == 1) this.doClick(this.i_gen);					
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					if(this.stsSimpan == 0){												
						//insert dulu ke tabel backup-nya
						sql.add("insert into ktu_notabu_m(no_bukti,tanggal,ket,nilai,no_closing,nik_user,tgl_input,kode_lokasi,kode_kantin,periode,no_ba,no_rekon, no_load,kode_pp, nilai_bayar, nik_admin,tgl_admin)  "+
								"select no_bukti,tanggal,ket,nilai,no_closing,nik_user,tgl_input,kode_lokasi,kode_kantin,periode,no_ba,no_rekon, no_load,kode_pp, nilai_bayar, '"+this.nikAdmin+"',getdate() "+
								"from ktu_nota_m where no_bukti = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						
						sql.add("insert into ktu_notabu_d(no_bukti,kode_lokasi,kode_pp,kode_tenan,nilai,kode_kantin,  nik_admin,tgl_admin) "+
								"select no_bukti,kode_lokasi,kode_pp,kode_tenan,nilai,kode_kantin, '"+this.nikAdmin+"',getdate() "+
								"from ktu_nota_d where no_bukti = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

						sql.add("insert into ktu_notabu_bayar(no_bukti,kode_lokasi,kode_bayar,id_bayar,nilai,no_ref1, nik_admin,tgl_admin) "+
								"select no_bukti,kode_lokasi,kode_bayar,id_bayar,nilai,no_ref1,  '"+this.nikAdmin+"',getdate() "+
								"from ktu_nota_bayar where no_bukti = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						
						sql.add("insert into brg_transbu_d (no_bukti,kode_lokasi,periode,modul,form,nu,kode_gudang,kode_barang,no_batch,tgl_ed,satuan,dc,stok,jumlah,bonus,harga,hpp,p_disk,diskon,tot_diskon,total, nik_admin,tgl_admin) "+
								"select no_bukti,kode_lokasi,periode,modul,form,nu,kode_gudang,kode_barang,no_batch,tgl_ed,satuan,dc,stok,jumlah,bonus,harga,hpp,p_disk,diskon,tot_diskon,total,  '"+this.nikAdmin+"',getdate() "+
								"from brg_trans_d where no_bukti = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

						//delete data
						sql.add("delete from ktu_nota_m where no_bukti = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
						sql.add("delete from ktu_nota_d where no_bukti = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
						sql.add("delete from brg_trans_d where no_bukti = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");							
						sql.add("delete from ktu_nota_bayar where no_bukti = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					}	


					sql.add("insert into ktu_nota_m(no_bukti,tanggal,ket,nilai,no_closing,nik_user,tgl_input,kode_lokasi,kode_kantin,periode,no_ba,no_rekon, no_load,kode_pp, nilai_bayar) values "+
						    "('"+this.cb_kode.getText()+"','"+this.dp_d1.getDateString()+"','Transaksi Nota : "+this.cb_kode.getText()+"',"+nilaiToFloat(this.e_total.getText())+",'-','"+this.app._userLog+"',getdate(),'"+this.app._lokasi+"','"+this.kodeKantin+"','"+this.e_periode.getText()+"','-','-','NON','"+this.app._kodePP+"',"+nilaiToFloat(this.e_totbayar.getText())+")");
					
					//jika ada non tunai
					if (this.sg2.getRowValidCount() > 0) {
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i) && nilaiToFloat(this.sg2.cells(3,i)) > 0){								                          								 
								sql.add("insert into ktu_nota_bayar(no_bukti,kode_lokasi,kode_bayar,id_bayar,nilai,no_ref1,  n_kembali) values "+
										"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(2,i)+"',"+nilaiToFloat(this.sg2.cells(3,i))+",'-',0)");
							}
						}
					}
					//jika ada tunai
					if (this.e_bayar.getText()!="0") {					
						var tunai = nilaiToFloat(this.e_bayar.getText());						
						sql.add("insert into ktu_nota_bayar (no_bukti,kode_lokasi,kode_bayar,id_bayar,nilai,no_ref1, n_kembali) values "+
								"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','TUNAI','-',"+tunai+",'-', "+nilaiToFloat(this.e_sisa.getText())+")");
					}

					//jika ada penjualan tenan
					if (this.sg3.getRowValidCount() > 0) {
						for (var i=0;i < this.sg3.getRowCount();i++){
							if (this.sg3.rowValid(i)){								                          								 
								sql.add("insert into ktu_nota_d(no_bukti,kode_lokasi,kode_pp,kode_tenan,nilai,kode_kantin) values "+
										"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.app._kodePP+"','"+this.sg3.cells(0,i)+"',"+nilaiToFloat(this.sg3.cells(2,i))+",'"+this.kodeKantin+"')");
							}
						}
					}

					//jika ada penjualan barag
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){																																										
								sql.add("insert into brg_trans_d (no_bukti,kode_lokasi,periode,modul,form,nu,kode_gudang,kode_barang,no_batch,tgl_ed,satuan,dc,stok,jumlah,bonus,harga,hpp,p_disk,diskon,tot_diskon,total) values "+
										"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','BRGJUAL','BRGJUAL',"+i+",'"+this.kodeKantin+"','"+this.sg.cells(0,i)+"','-',getdate(),'"+this.sg.cells(2,i)+"','C',0,"+
										nilaiToFloat(this.sg.cells(4,i))+",0,"+nilaiToFloat(this.sg.cells(3,i))+",0,0,0,0,"+nilaiToFloat(this.sg.cells(5,i))+")");
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
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					//insert dulu ke tabel backup-nya
					sql.add("insert into ktu_notabu_m(no_bukti,tanggal,ket,nilai,no_closing,nik_user,tgl_input,kode_lokasi,kode_kantin,periode,no_ba,no_rekon, no_load,kode_pp,nilai_bayar, nik_admin,tgl_admin)  "+
							"select no_bukti,tanggal,ket,nilai,no_closing,nik_user,tgl_input,kode_lokasi,kode_kantin,periode,no_ba,no_rekon, no_load,kode_pp,nilai_bayar, '"+this.nikAdmin+"',getdate() "+
							"from ktu_nota_m where no_bukti = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("insert into ktu_notabu_d(no_bukti,kode_lokasi,kode_pp,kode_tenan,nilai,kode_kantin,  nik_admin,tgl_admin) "+
							"select no_bukti,kode_lokasi,kode_pp,kode_tenan,nilai,kode_kantin, '"+this.nikAdmin+"',getdate() "+
							"from ktu_nota_d where no_bukti = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

					sql.add("insert into ktu_notabu_bayar(no_bukti,kode_lokasi,kode_bayar,id_bayar,nilai,no_ref1, nik_admin,tgl_admin) "+
							"select no_bukti,kode_lokasi,kode_bayar,id_bayar,nilai,no_ref1,  '"+this.nikAdmin+"',getdate() "+
							"from ktu_nota_bayar where no_bukti = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("insert into brg_transbu_d (no_bukti,kode_lokasi,periode,modul,form,nu,kode_gudang,kode_barang,no_batch,tgl_ed,satuan,dc,stok,jumlah,bonus,harga,hpp,p_disk,diskon,tot_diskon,total, nik_admin,tgl_admin) "+
							"select no_bukti,kode_lokasi,periode,modul,form,nu,kode_gudang,kode_barang,no_batch,tgl_ed,satuan,dc,stok,jumlah,bonus,harga,hpp,p_disk,diskon,tot_diskon,total,  '"+this.nikAdmin+"',getdate() "+
							"from brg_trans_d where no_bukti = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

					sql.add("delete from ktu_nota_m where no_bukti = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from ktu_nota_d where no_bukti = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("delete from brg_trans_d where no_bukti = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");							
					sql.add("delete from ktu_nota_bayar where no_bukti = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");							
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
				if (modalResult == mrOk) this.standarLib.clearByTag(this, new Array("0","1","9"),this.cb_kode);
				setTipeButton(tbSimpan);
				this.pc1.setActivePage(this.pc1.childPage[0]);
				this.pc2.setActivePage(this.pc2.childPage[0]);
				this.stsSimpan=1;
				this.doClick(this.i_gen);
				this.sg1.clear(1);
				this.sg.clear(1);
				this.sg2.clear(1);
				this.sg3.clear(1);
				this.doLoadJenisBayar();
				break;
			case "simpan" :	
			case "ubah" :
				this.preView = "1";
				if (nilaiToFloat(this.e_total.getText()) > nilaiToFloat(this.e_totbayar.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total Bayar kurang dari total transaksi.");
					return false;						
				}

				/*
				if (nilaiToFloat(this.e_sisa.getText()) > 0 && this.nonTunai > 0) {
					system.alert(this,"Transaksi tidak valid.","Total NonCash dan Cash melebihi total transaksi.");
					return false;						
				} 
				*/

				if (this.nonTunai > nilaiToFloat(this.e_total.getText()) ) {
					system.alert(this,"Transaksi tidak valid.","Total NonCash melebihi total transaksi.");
					return false;						
				}


				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);																	
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total nota tidak boleh 0 atau kurang.");
					return false;						
				}				
				else 
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;				
			case "hapus" :	
				this.preView = "0";
				this.hapus();
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12){
			this.e_periode.setText(y+""+m);			
		}
		else {
			this.e_periode.setText(this.app._periode);					
		}			
		if (this.stsSimpan == 1) {
			this.doClick(this.i_gen);
		}
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			if(this.stsSimpan==0){
				this.e_nilai.setText("0");
				this.e_total.setText("0");	
				this.doLoadJenisBayar();			
			}
			this.cb_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"ktu_nota_m","no_bukti",this.app._lokasi+"-NT"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.stsSimpan=1;	
			setTipeButton(tbSimpan);
		}
	},
	doChange: function(sender){
		try{
			if ((sender == this.e_nilai || this.e_totalbrg) && this.e_nilai.getText()!="" && this.e_totalbrg.getText()!="") {
				var tot = nilaiToFloat(this.e_nilai.getText()) + nilaiToFloat(this.e_totalbrg.getText());
				this.e_total.setText(floatToNilai(tot));
			}

			if (sender == this.e_bayar && this.e_bayar.getText()!="") {
				var totbayar = nilaiToFloat(this.e_bayar.getText()) + this.nonTunai;
				this.e_totbayar.setText(floatToNilai(totbayar));				
			}

			if ((sender == this.e_totbayar || this.e_total) && this.e_totbayar.getText()!="" && this.e_total.getText()!="") {
				var sisa = nilaiToFloat(this.e_totbayar.getText()) - nilaiToFloat(this.e_total.getText());
				if (sisa > 0) this.e_sisa.setText(floatToNilai(sisa));
				else this.e_sisa.setText("0");
			}

		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doChangeCell2: function(sender, col, row){											
		if (col == 3) this.sg2.validasi();				
	},
	doNilaiChange2: function(){
		try{			
			this.nonTunai =  0;
			for (var i = 0; i < this.sg2.rows.getLength();i++){
				if (this.sg2.rowValid(i) && this.sg2.cells(3,i) != ""){
					this.nonTunai += nilaiToFloat(this.sg2.cells(3,i));				
				}
			}										
			this.doChange(this.e_bayar);
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
								this.nama_report="server_report_saku3_tu_kantin_rptNota";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bukti='"+this.cb_kode.getText()+"' ";
								this.filter2 = "";
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
							} 
							else {
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.cb_kode.getText()+")","");							
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
							this.dataTenan = new portalui_arrayMap();														
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataTenan.set(line.kode_tenan, line.nama);										
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
			this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);
			setTipeButton(tbSimpan);
			this.pc1.setActivePage(this.pc1.childPage[0]);
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.stsSimpan=1;
			this.doClick(this.i_gen);
			this.sg1.clear(1);
			this.sg.clear(1);
			this.sg2.clear(1);
			this.sg3.clear(1);
			this.doLoadJenisBayar();
		} catch(e) {
			alert(e);
		}
	},	
	doLoad:function(sender){	
		if (this.e_admin.getText()!="" && this.e_pwd.getText()!="" && this.e_nota1.getText()!="") {		
			var strSQL = "select pass,status_admin from hakakses where nik ='"+this.e_admin.getText()+"' and kode_lokasi= '"+this.app._lokasi+"' ";						   
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){						
					if (line.pass == this.e_pwd.getText() && line.status_admin == "A") {
						var strSQL = "select a.no_bukti,a.tanggal,a.ket,a.no_closing,a.nilai "+
									 "from ktu_nota_m a "+
									 "where a.tanggal = '"+this.dp_d1.getDateString()+"' and a.no_closing = '-' and a.no_bukti='"+this.e_nota1.getText()+"' "+
									 "and a.nik_user = '"+this.app._userLog+"' and a.kode_lokasi='"+this.app._lokasi+"' ";				
						var data = this.dbLib.getDataProvider(strSQL,true);		
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							this.nikAdmin = this.e_admin.getText();
							this.dataJU = data;
							this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
							this.sgn1.rearrange();
							this.doTampilData(1);							
							this.doDoubleClick(this.sg1,0,0);											
						} 
						else {
							this.sg1.clear(1);		
							system.alert(this,"Nota tidak valid.","");
							return false;						
						}						
					}
					else {
						system.alert(this,"User Admin tidak valid.","Password dan atau status admin tidak valid.");
						return false;												
					}
				}
			}
			this.e_admin.setText("");
			this.e_pwd.setText("");
			this.e_nota1.setText("");				
		}
		else system.alert(this,"Parameter tidak valid.","");	
	},
	
	doTampilData: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.no_bukti,line.ket,line.tanggal,floatToNilai(line.nilai),line.no_closing]); 
		}
		this.sg1.setNoUrut(start);

	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},

	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;

				this.pc1.setActivePage(this.pc1.childPage[0]);														
				this.cb_kode.setText(this.sg1.cells(0,row));

				var strSQL = "select * from ktu_nota_m where no_bukti ='"+this.cb_kode.getText()+"' and kode_lokasi= '"+this.app._lokasi+"' ";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.dp_d1.setText(line.tanggal);
						this.e_nilai.setText(floatToNilai(line.nilai));
					}
				}	

				var strSQL = "select a.kode_bayar,a.ket,isnull(b.id_bayar,'-') as id_bayar,isnull(b.nilai,0) as nilai "+
							 "from ktu_jbayar a "+
							 "left join ktu_nota_bayar b on a.kode_bayar=b.kode_bayar and a.kode_lokasi=b.kode_lokasi and b.kode_lokasi ='"+this.app._lokasi+"' and b.no_bukti='"+this.cb_kode.getText()+"' order by a.kode_bayar";	

				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];			
						if (line.kode_bayar == "TUNAI")
							this.e_bayar.setText(floatToNilai(line.nilai));
						else this.sg2.appendData([line.kode_bayar,line.ket,line.id_bayar,floatToNilai(line.nilai)]);
					}
				} else this.sg2.clear(1);


				var strSQL = "select a.kode_barang,b.nama,a.satuan,a.jumlah,a.harga,round(a.jumlah * a.harga,0) as total "+
							 "from brg_trans_d a inner join ktu_barang b on a.kode_barang=b.kode_barang and a.kode_lokasi=b.kode_lokasi "+
							 "where a.no_bukti='"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";										
				var data1 = this.dbLib.getDataProvider(strSQL,true);	
				if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
					var line1;
					this.sg.clear();
					for (var i in data1.rs.rows){
						line1 = data1.rs.rows[i];																													
						this.sg.appendData([line1.kode_barang,line1.nama,line1.satuan,parseFloat(line1.harga),parseFloat(line1.jumlah),parseFloat(line1.total)]);
					}
				} else this.sg.clear(1);												
				this.sg.validasi();		

				var strSQL = "select a.kode_tenan,b.nama,a.nilai "+
							 "from ktu_nota_d a inner join ktu_tenan b on a.kode_tenan=b.kode_tenan and a.kode_lokasi=b.kode_lokasi "+
							 "where a.no_bukti='"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";										
				var data2 = this.dbLib.getDataProvider(strSQL,true);	
				if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
					var line2;
					this.sg3.clear();
					for (var i in data2.rs.rows){
						line2 = data2.rs.rows[i];																													
						this.sg3.appendData([line2.kode_tenan,line2.nama,parseFloat(line2.nilai)]);
					}
				} else this.sg3.clear(1);												
				this.sg3.validasi();		
			}
		} catch(e) {alert(e);}
	}

});
