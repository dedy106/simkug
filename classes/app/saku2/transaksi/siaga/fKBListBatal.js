window.app_saku2_transaksi_siaga_fKBListBatal = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_siaga_fKBListBatal.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku2_transaksi_siaga_fKBListBatal";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Daftar Pembayaran : Batal", 0);	
		
		this.maximize();		
		uses("portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Bukti", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});							
		this.e_ket = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"Keterangan",readOnly:true});				
		this.cb_buat = new saiCBBL(this,{bound:[20,16,200,20],caption:"NIK Pembuat",readOnly:true});				
		this.cb_man = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Manajer",readOnly:true});				
		this.cb_tahu = new saiCBBL(this,{bound:[20,18,200,20],caption:"NIK Mengetahui",readOnly:true});				
		this.cb_setuju = new saiCBBL(this,{bound:[20,16,200,20],caption:"NIK Menyetujui",readOnly:true});				
		
		this.p1 = new panel(this,{bound:[20,23,900,360],caption:"Data Item Pengajuan"});		
		this.sg = new saiGrid(this.p1,{bound:[1,20,this.p1.width-5,this.p1.height-45],colCount:11,tag:0,
		            colTitle:["Status","Bank Acc","Nama Bank","Jenis","No BG/Cek","No Bukti","Uraian","Tgl Bayar","Curr","Nilai","Modul"],					
					colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[70,100,50,70,200,100,80,70,150,80,70]],					
					readOnly:true,					
					colFormat:[[9],[cfNilai]],					
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height-25,this.p1.width-1,25],buttonStyle:3,grid:this.sg});		

		
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		this.rearrangeChild(10,23);
		
		this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);		
		setTipeButton(tbHapus);		
		this.setTabChildIndex();		
	}
};
window.app_saku2_transaksi_siaga_fKBListBatal.extend(window.portalui_childForm);
window.app_saku2_transaksi_siaga_fKBListBatal.implement({	
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
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk){
					this.standarLib.clearByTag(this, [0,1],undefined);									
					this.sg.clear(1);
					setTipeButton(tbHapus);
				}
				break;
			case "hapus" :	
					this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
					if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
						system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
						return false;
					}	
					else {	
						uses("server_util_arrayList");
						var sql = new server_util_arrayList();
						if (this.sg.getRowValidCount() > 0){
							for (var i=0;i < this.sg.getRowCount();i++){
								if (this.sg.rowValid(i)){
									if (this.sg.cells(0,i) == "APP") {
										if (this.sg.cells(10,i) == "SPB") sql.add("update gr_spb_m set no_kaslist='-' where no_spb='"+this.sg.cells(5,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
									}
								}						
							}
						}
						sql.add("delete from gr_kaslist_m where no_kaslist = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from gr_kaslist_d where no_kaslist = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						setTipeButton(tbAllFalse);	
						this.dbLib.execArraySQL(sql);
					}
				break;								
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else this.e_periode.setText(this.app._periode);		
	},	
	doChange:function(sender){
		if (sender == this.e_periode && this.e_periode.getText()!="") {						
			this.e_nb.setSQL("select distinct a.no_kaslist, a.keterangan from gr_kaslist_m a left join (select no_kaslist,kode_lokasi,no_kas from gr_kaslist_d where no_kas<>'-' and kode_lokasi='"+this.app._lokasi+"') b on a.no_kaslist=b.no_kaslist and a.kode_lokasi=b.kode_lokasi "+
			                 "where b.no_kas is null and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["a.no_kaslist","a.keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);			
		}
		if (sender == this.e_nb && this.e_nb.getText()!="") {
			var strSQL = "select a.tanggal,a.keterangan,a.nik_buat,a.nik_man,a.nik_tahu,a.nik_setuju,b.nama as nama_buat,c.nama as nama_man,d.nama as nama_tahu,e.nama as nama_setuju from gr_kaslist_m a "+
						 "       inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi "+			
						 "       inner join karyawan c on a.nik_man=c.nik and a.kode_lokasi=c.kode_lokasi "+			
						 "       inner join karyawan d on a.nik_tahu=d.nik and a.kode_lokasi=d.kode_lokasi "+			
						 "       inner join karyawan e on a.nik_setuju=e.nik and a.kode_lokasi=e.kode_lokasi "+			
						 "where a.no_kaslist='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
					this.dp_d1.setText(line.tanggal);					
					this.e_ket.setText(line.keterangan);
					this.cb_buat.setText(line.nik_buat,line.nama_buat);
					this.cb_man.setText(line.nik_man,line.nama_man);
					this.cb_tahu.setText(line.nik_tahu,line.nama_tahu);
					this.cb_setuju.setText(line.nik_setuju,line.nama_setuju);
				} 
			}								
			strSQL = "select a.kode_bank,b.nama+' | '+b.no_rek as nama_bank,a.via,a.no_bg,a.no_bukti,a.keterangan,a.tgl_bayar,a.kode_curr,a.nilai,a.modul "+
				     "from gr_kaslist_d a inner join bank b on a.kode_bank=b.kode_bank and a.kode_lokasi=b.kode_lokasi where a.no_kaslist='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData(["APP",line.kode_bank,line.nama_bank,line.via,line.no_bg,line.no_bukti,line.keterangan,line.tgl_bayar,line.kode_curr,floatToNilai(line.nilai_curr),line.modul]);
				}
			} else this.sg.clear(1);
		}
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			switch(methodName){
				case "execArraySQL":
					if (result.toLowerCase().search("error") == -1){
						this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.e_nb.getText()+")");
						this.app._mainForm.bClear.click();              
					}else
						system.info(this, result,"");											
				break;
			}
		}		
	}
});
