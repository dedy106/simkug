window.app_saku2_transaksi_kopeg_apotek_fBeliTunai2 = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_apotek_fBeliTunai2.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_apotek_fBeliTunai2";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pembelian Barang", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",readOnly:true,tag:2,visible:false});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]});

		this.pc2 = new pageControl(this,{bound:[10,10,1000,440], childPage:["Data Input","List Pembelian"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:6,tag:9,
		     		colTitle:["No Bukti","Tanggal","Vendor","Deskripsi","Total","Pilih"],
					colWidth:[[5,4,3,2,1,0],[70,100,350,200,80,100]],
					colFormat:[[4,5],[cfNilai,cfButton]],readOnly:true,
					click:[this,"doSgBtnClick3"], colAlign:[[5],[alCenter]],													 
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_nbkas = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,200,20],caption:"No Bukti KB",maxLength:30,readOnly:true});		
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,14,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_dok = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,225,20],caption:"No Dokumen", maxLength:100});				
		this.e_diskon = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,13,200,20],caption:"Nilai Diskon", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});		
		this.e_ket = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,503,20],caption:"Keterangan", maxLength:150});				
		this.e_ppn = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,14,200,20],caption:"Nilai PPN", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});		
		this.cb_vendor = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"Vendor",multiSelection:false,tag:1});
		this.e_mat = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,15,200,20],caption:"Materai", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});		
		this.cb_gudang = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,16,220,20],caption:"Gudang",multiSelection:false,tag:1});
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,16,200,20],caption:"Total+", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,10,996,269], childPage:["Detail Item"]});
		this.sg = new portalui_saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:9,tag:2,
		            colTitle:["Kode","Nama","Merk - Tipe","Satuan","Harga","Jumlah","Bonus","Tot Diskon","SubTtl"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[100,80,70,70,80,50,200,200,80]],
					colFormat:[[4,5,6,7,8],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
					columnReadOnly:[true,[1,2,3,4],[0,5,6,7,8]],
					ellipsClick:[this,"doEllipseClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					buttonStyle:[[0],[bsEllips]], defaultRow:1,autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		
		
		this.rearrangeChild(10, 22);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		
		this.sgT = new portalui_saiGrid(this.pc2.childPage[0],{bound:[120,200,395,200],colCount:4,tag:9,visible:false,
			colTitle:["Kode","Jum","Stok","Baru"],
			colWidth:[[0,1,2,3],[100,100,100,100]],
			colFormat:[[1,2,3],[cfNilai,cfNilai,cfNilai]],
			readOnly:true,defaultRow:1,autoAppend:false});

		setTipeButton(tbSimpan);
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
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);									

			this.cb_gudang.setSQL("select kode_gudang, nama from apo_brg_gudang where kode_lokasi = '"+this.app._lokasi+"'",["kode_gudang","nama"],false,["Kode","Nama"],"and","Data Gudang",true);
			this.cb_vendor.setSQL("select kode_vendor, nama from vendor where kode_lokasi = '"+this.app._lokasi+"'",["kode_vendor","nama"],false,["Kode","Nama"],"and","Data Vendor",true);
		
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('OBTCAS','OBTPOLI','OBTMAT','PPNM','OBTHUT','OBTINV','OBTDIS') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					//PPNM akunnya ganti dgn akun hpp dgn ppnya poliklinik
					//akun ppnm di balikin lagi ke akun ppn masukan - 15-07-2019

					if (line.kode_spro == "PPNM") this.akunPPN = line.flag;								
					if (line.kode_spro == "OBTHUT") this.akunHutang = line.flag;	
					if (line.kode_spro == "OBTCAS") this.akunKas = line.flag;		
					if (line.kode_spro == "OBTINV") this.akunBarang = line.flag;			
					if (line.kode_spro == "OBTDIS") this.akunDiskon = line.flag;			
					if (line.kode_spro == "OBTMAT") this.akunMat = line.flag;			
					if (line.kode_spro == "OBTPOLI") this.ppPoli = line.flag;								
				}
			}	
			
			var sql = new server_util_arrayList();
			sql.add("select kode_brg, nama from apo_brg_m where kode_lokasi='"+this.app._lokasi+"'");
			this.dbLib.getMultiDataProviderA(sql);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_apotek_fBeliTunai2.extend(window.portalui_childForm);
window.app_saku2_transaksi_kopeg_apotek_fBeliTunai2.implement({		
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
					if (this.stsSimpan == 1) {
						this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"apo_brg_beli_m","no_beli",this.app._lokasi+"-BELI"+this.e_periode.getText().substr(2,4)+".","000"));
						this.e_nbkas.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kas_m","no_kas",this.app._lokasi+"-KK"+this.e_periode.getText().substr(2,4)+".","000"));
					}
					
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					

					if (this.stsSimpan == 0) {
						this.nik_user=this.app._userLog;						
						var sqlsp = "call sp_apo_stok ('"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.nik_user+"')";
						this.dbLib.execQuerySync(sqlsp);	
						
						if (this.sgT.getRowValidCount() > 0){
							for (var i=0;i < this.sgT.getRowCount();i++){
								if (this.sgT.rowValid(i)){
									var data = this.dbLib.getDataProvider("select round(stok,0) as stok from apo_brg_stok where kode_brg='"+this.sgT.cells(0,i)+"'  and kode_gudang='"+this.cb_gudang.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and nik_user='"+this.nik_user+"'",true);
									if (typeof data == "object"){
										var line = data.rs.rows[0]; 
										if (line != undefined) this.sgT.cells(2,i,floatToNilai(line.stok));
									}
									var j = i+1;
									if (nilaiToFloat(this.sgT.cells(1,i)) > (nilaiToFloat(this.sgT.cells(2,i)) + nilaiToFloat(this.sgT.cells(3,i)))  ) {
										system.alert(this,"Jumlah koreksi melebihi Stok.","Barang "+this.sgT.cells(0,i)+" ");
										return false;
									}
								}
							}						
						}	

						sql.add("delete from apo_brg_beli_m where no_beli ='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
						sql.add("delete from apo_brg_beli_j where no_beli ='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");					
						sql.add("delete from apo_brg_beli_d where no_beli ='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");															

						sql.add("delete from kas_m where no_kas = '"+this.e_nbkas.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kas_j where no_kas = '"+this.e_nbkas.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from apo_brg_belibayar_d where no_bukti = '"+this.e_nbkas.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}

					var totDiskon = nilaiToFloat(this.e_diskon.getText()) + this.diskon;					
					sql.add("insert into apo_brg_beli_m(no_beli,kode_lokasi,tanggal,no_dokumen,keterangan,kode_gudang,periode,nik_user,tgl_input,nilai,nilai_ppn,nilai_diskon,nilai_mat,kode_vendor,no_kas,posted,modul) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+this.cb_gudang.getText()+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),"+nilaiToFloat(this.e_total.getText())+","+nilaiToFloat(this.e_ppn.getText())+","+nilaiToFloat(this.e_diskon.getText())+","+nilaiToFloat(this.e_mat.getText())+",'"+this.cb_vendor.getText()+"','"+this.e_nbkas.getText()+"','F','TUNAI')");					
					sql.add("insert into apo_brg_beli_j(no_beli,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.akunBarang+"','"+this.e_ket.getText()+"','D',"+this.barang+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','BRGBELI','BRG','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
					sql.add("insert into apo_brg_beli_j(no_beli,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',1,'"+this.akunPPN+"','"+this.e_ket.getText()+"','D',"+nilaiToFloat(this.e_ppn.getText())+",'"+this.ppPoli+"','-','"+this.app._lokasi+"','BRGBELI','PPN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");					
					sql.add("insert into apo_brg_beli_j(no_beli,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',2,'"+this.akunDiskon+"','"+this.e_ket.getText()+"','C',"+totDiskon+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','BRGBELI','DIS','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
					sql.add("insert into apo_brg_beli_j(no_beli,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',3,'"+this.akunDiskon+"','"+this.e_ket.getText()+"','C',"+this.bonus+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','BRGBELI','BONUS','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");				
					sql.add("insert into apo_brg_beli_j(no_beli,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',4,'"+this.akunHutang+"','"+this.e_ket.getText()+"','C',"+nilaiToFloat(this.e_total.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','BRGBELI','HUT','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
					sql.add("insert into apo_brg_beli_j(no_beli,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',5,'"+this.akunMat+"','"+this.e_ket.getText()+"','D',"+nilaiToFloat(this.e_mat.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','BRGBELI','BEAMAT','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
					
					//selisih koma
					sql.add("insert into apo_brg_beli_j(no_beli,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) "+
							"select "+
							"no_beli,'-','"+this.dp_d1.getDateString()+"','99','"+this.akunDiskon+"','SLS', case when (debet-kredit)>0 then 'C' else 'D' end,abs(debet-kredit),'"+this.app._kodePP+"','-','"+this.app._lokasi+"','BRGBELI','SLS','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1 "+
							"from "+
							"( "+
							"    select no_beli,kode_lokasi, "+
							"    sum(case dc when 'D' then nilai else 0 end) as debet, "+
							"    sum(case dc when 'C' then nilai else 0 end) as kredit "+
							"    from apo_brg_beli_j where no_beli='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
							"    group by no_beli,kode_lokasi "+
							")a where a.debet <> a.kredit and a.no_beli='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){															
								var diskonBrg = nilaiToFloat(this.sg.cells(7,i)) / nilaiToFloat(this.sg.cells(5,i));
								sql.add("insert into apo_brg_beli_d (no_beli,kode_lokasi,periode,nu,kode_brg,kode_gudang,satuan,jumlah,bonus,harga,diskon) values "+  
									   "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.cb_gudang.getText()+"','"+this.sg.cells(3,i)+"',"+nilaiToFloat(this.sg.cells(5,i))+","+nilaiToFloat(this.sg.cells(6,i))+","+nilaiToFloat(this.sg.cells(4,i))+","+diskonBrg+")");								
							}
						}						
					}					
					sql.add("update a set a.harga=b.harga "+
					        "from apo_brg_m a inner join apo_brg_beli_d b on a.kode_brg=b.kode_brg and a.kode_lokasi=b.kode_lokasi "+
							"where b.no_beli='"+this.e_nb.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'");										
											
							
					//--------- KB ------------
					sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
							"('"+this.e_nbkas.getText()+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','-','"+this.akunKas+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','TUNBELIAPO','KK','"+this.e_periode.getText()+"','IDR',1,"+parseNilai(this.e_total.getText())+",'"+this.app._userLog+"','"+this.app._userLog+"',getdate(),'"+this.app._userLog+"','F','-','"+this.e_nb.getText()+"','"+this.cb_vendor.getText()+"','-')");					
					sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+
							"('"+this.e_nbkas.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.akunHutang+"','"+this.e_ket.getText()+"','D',"+parseNilai(this.e_total.getText())+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','TUNBELIAPO','HUT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-')");					
					sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+
							"('"+this.e_nbkas.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',1,'"+this.akunKas+"','"+this.e_ket.getText()+"','C',"+parseNilai(this.e_total.getText())+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','TUNBELIAPO','KB','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-')");					

					sql.add("insert into apo_brg_belibayar_d(no_bukti,no_beli,kode_lokasi,modul,periode,nik_user,tgl_input,dc,nilai) values "+
							"('"+this.e_nbkas.getText()+"','"+this.e_nb.getText()+"','"+this.app._lokasi+"','TUNBELIAPO','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'D',"+parseNilai(this.e_total.getText())+")");					
										

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
					this.sg.clear(1); this.sgT.clear(1); this.sg3.clear(1);
					this.e_ket.setText("PEMBELIAN OBAT UTK PERSEDIAAN BLN ");
					this.doClick();
					this.doLoad3();
				}
				break;
			case "simpan" :	
			case "ubah" :	
				this.preView = "1";
			    for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i)){
						for (var j=i;j < this.sg.getRowCount();j++){
							if (this.sg.cells(0,j) == this.sg.cells(0,i) && (i != j)) {
							    var k = i+1;
								system.alert(this,"Transaksi tidak valid.","Duplikasi data barang untuk baris ["+k+"]");
								return false;
							}
						}
						for (var j=0;j < this.sgT.getRowCount();j++){
							if (this.sg.cells(0,i) == this.sgT.cells(0,j)) {
							    this.sgT.cells(3,j,nilaiToFloat(this.sg.cells(5,i))+nilaiToFloat(this.sg.cells(6,i)));
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
					this.nik_user=this.app._userLog;						
					var sql = "call sp_apo_stok ('"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.nik_user+"')";
					this.dbLib.execQuerySync(sql);	
					
					if (this.sgT.getRowValidCount() > 0){
						for (var i=0;i < this.sgT.getRowCount();i++){
							if (this.sgT.rowValid(i)){
								var data = this.dbLib.getDataProvider("select round(stok,0) as stok from apo_brg_stok where kode_brg='"+this.sgT.cells(0,i)+"'  and kode_gudang='"+this.cb_gudang.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and nik_user='"+this.nik_user+"'",true);
								if (typeof data == "object"){
									var line = data.rs.rows[0]; 
									if (line != undefined) this.sgT.cells(2,i,floatToNilai(line.stok));
								}
								var j = i+1;
								if (nilaiToFloat(this.sgT.cells(1,i)) > nilaiToFloat(this.sgT.cells(2,i))) {
									system.alert(this,"Jumlah koreksi melebihi Stok.","Barang "+this.sgT.cells(0,i)+" ");
									return false;
								}
							}
						}						
					}		
							
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from apo_brg_beli_m where no_beli ='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
					sql.add("delete from apo_brg_beli_j where no_beli ='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");					
					sql.add("delete from apo_brg_beli_d where no_beli ='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");															

					sql.add("delete from kas_m where no_kas = '"+this.e_nbkas.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from kas_j where no_kas = '"+this.e_nbkas.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from apo_brg_belibayar_d where no_bukti = '"+this.e_nbkas.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;
		}
	},
	doClick:function(sender){
		if (this.e_periode.getText()!="") {
			if (this.stsSimpan == 0) {
				this.sg.clear(1);
				this.sgT.clear(1);
			}		
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"apo_brg_beli_m","no_beli",this.app._lokasi+"-BELI"+this.e_periode.getText().substr(2,4)+".","000"));
			this.e_nbkas.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kas_m","no_kas",this.app._lokasi+"-KK"+this.e_periode.getText().substr(2,4)+".","000"));
			this.e_dok.setFocus();
			this.e_ket.setText("PEMBELIAN OBAT UTK PERSEDIAAN BLN ");
			this.stsSimpan = 1;
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}
		this.periodeBrg = this.e_periode.getText().substr(0,4)+"01";	
		if (this.stsSimpan==1) {
			this.doClick();	
			this.doLoad3();
		}
	},
	doEllipseClick: function(sender, col, row){
		try{			
			if (col == 0){
				this.standarLib.showListData(this, "Daftar Item Barang",sender,undefined, 
											  "select kode_brg, nama from apo_brg_m where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_brg) from apo_brg_m where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_brg","nama"],"and",["Kode","Nama"],false);				
			}

		}catch(e){
			systemAPI.alert(e);
		}
	},
	doChangeCell: function(sender, col, row){
		if (col == 0 && this.sg.cells(0,row)!="") {
			if (this.sg.cells(0,row) != "") {
				sender.onChange.set(undefined,undefined);
				var brg = this.dataBrg.get(sender.cells(0,row));
				if (brg) sender.cells(1,row,brg);
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Barang "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkBrg");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
					sender.onChange.set(this,"doChangeCell");
					return false;
				}	
				sender.onChange.set(this,"doChangeCell");
			}			
			var strSQL = "select merk+' - '+tipe as ket,satuan,harga from apo_brg_m where kode_brg='"+this.sg.cells(0,row)+"' and kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
					this.sg.cells(2,row,line.ket);	
					this.sg.cells(3,row,line.satuan);	
					this.sg.cells(4,row,floatToNilai(line.harga));	
					this.sg.cells(5,row,"0");	
					this.sg.cells(6,row,"0");						
					this.sg.cells(7,row,"0");
					this.sg.cells(8,row,"0");
				} 
				else {
					this.sg.cells(2,row,"");	
					this.sg.cells(3,row,"");	
					this.sg.cells(4,row,"");	
					this.sg.cells(5,row,"");	
					this.sg.cells(6,row,"");
					this.sg.cells(7,row,"");					
					this.sg.cells(8,row,"");
				}
			}			
		}
		if (col == 8 || col == 5 || col == 7) {
			if (this.sg.cells(8,row) != "" && this.sg.cells(7,row) != "" && this.sg.cells(5,row) != "" && this.sg.cells(5,row) != "0" && this.sg.cells(8,row) != "0") {
				this.sg.cells(4,row,parseFloat((nilaiToFloat(this.sg.cells(8,row))+nilaiToFloat(this.sg.cells(7,row))) / nilaiToFloat(this.sg.cells(5,row))));
			}
		}		
		this.sg.validasi();
	},
	doNilaiChange: function(){
		try{
			this.barang = this.bonus = this.diskon = 0;
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(8,i) != ""){
					tot += nilaiToFloat(this.sg.cells(8,i));
					
					this.barang += Math.round( nilaiToFloat(this.sg.cells(4,i)) * (nilaiToFloat(this.sg.cells(5,i))+nilaiToFloat(this.sg.cells(6,i))) );
					this.diskon += Math.round(nilaiToFloat(this.sg.cells(7,i)));
					this.bonus += Math.round(nilaiToFloat(this.sg.cells(4,i)) * nilaiToFloat(this.sg.cells(6,i)));
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
								this.nama_report="server_report_saku2_kopeg_apotek_rptBeli";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_beli='"+this.e_nb.getText()+"' ";
								this.filter2 = this.e_periode.getText();
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
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataBrg = new portalui_arrayMap();							
							if (result.result[0]){
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];
									this.dataBrg.set(line.kode_brg,line.nama);
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
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);		
			this.sg.clear(1); this.sgT.clear(1); this.sg3.clear(1);
			this.e_ket.setText("PEMBELIAN OBAT UTK PERSEDIAAN BLN ");
			this.doClick();
			this.doLoad3();
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																				
		var strSQL = "select a.no_beli, convert(varchar,a.tanggal,103) as tgl, a.keterangan, c.nama as vendor, a.nilai "+
					 "from apo_brg_beli_m a "+
					 "inner join vendor c on a.kode_vendor=c.kode_vendor and a.kode_lokasi=c.kode_lokasi "+
					 "inner join kas_m cc on a.no_beli=cc.no_link and a.kode_lokasi=cc.kode_lokasi and cc.posted ='F' "+							 					 
					 "where a.modul='TUNAI' and a.posted='F' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
					 "order by a.no_beli desc";
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
			this.sg3.appendData([line.no_beli,line.tgl,line.vendor,line.keterangan,floatToNilai(line.nilai),"Pilih"]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doSgBtnClick3: function(sender, col, row){
		try{
			if (col == 5) this.doDoubleClick3(this.sg3,0,row); 				
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				setTipeButton(tbUbahHapus);				
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
								
				var strSQL = "select no_dokumen,keterangan,periode,tanggal,kode_vendor,kode_gudang,nilai,nilai_ppn,nilai_diskon,nilai_mat,no_kas "+
							 "from apo_brg_beli_m where no_beli='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.e_nbkas.setText(line.no_kas);
						this.perLama = line.periode;					
						this.dp_d1.setText(line.tanggal);							
						this.e_dok.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);
						this.cb_vendor.setText(line.kode_vendor);					
						this.cb_gudang.setText(line.kode_gudang);					
						this.e_diskon.setText(floatToNilai(line.nilai_diskon));
						this.e_ppn.setText(floatToNilai(line.nilai_ppn));
						this.e_mat.setText(floatToNilai(line.nilai_mat));
						this.e_total.setText(floatToNilai(line.nilai));
					} 
				}								
				this.nik_user=this.app._userLog;
				var sql = "call sp_apo_stok ('"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.nik_user+"')";
				this.dbLib.execQuerySync(sql);	
				
				strSQL = "select a.kode_brg,a.satuan,a.jumlah,a.bonus,a.harga,a.diskon,b.nama,b.merk+' - '+b.tipe as ket,round(a.jumlah * (a.harga-a.diskon),0) as total,c.stok, a.jumlah+a.bonus as jumbon "+
						 "from apo_brg_beli_d a inner join apo_brg_m b on a.kode_brg=b.kode_brg and a.kode_lokasi=b.kode_lokasi "+
						 "                      inner join apo_brg_stok c on a.kode_brg=c.kode_brg  and a.kode_gudang=c.kode_gudang and a.kode_lokasi=c.kode_lokasi and c.nik_user='"+this.nik_user+"' "+
						 "where a.no_beli='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";										
				var data1 = this.dbLib.getDataProvider(strSQL,true);	
				if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
					var line1;
					this.sg.clear();
					this.sgT.clear();
					for (var i in data1.rs.rows){
						line1 = data1.rs.rows[i];		
						this.sg.appendData([line1.kode_brg,line1.nama,line1.ket,line1.satuan,floatToNilai(line1.harga),floatToNilai(line1.jumlah),floatToNilai(line1.bonus),floatToNilai(line1.diskon),floatToNilai(line1.total)]);
						this.sgT.appendData([line1.kode_brg,floatToNilai(line1.jumbon),floatToNilai(line1.stok),"0"]);
					}
				} else this.sg.clear(1);												
				this.sg.validasi();

			}									
		} catch(e) {alert(e);}
	}
});