window.app_saku2_transaksi_siaga_fSpbVerBatal = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_siaga_fSpbVerBatal.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku2_transaksi_siaga_fSpbVerBatal";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Verifikasi SPB : Batal", 0);	
		
		this.maximize();		
		uses("portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Bukti", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});							
		this.e_ket = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"Keterangan", readOnly:true});				
		this.cb_buat = new saiCBBL(this,{bound:[20,16,220,20],caption:"Dibuat Oleh",readOnly:true});				
		this.cb_spb = new saiCBBL(this,{bound:[20,17,220,20],caption:"No SPB",readOnly:true});
		this.e_npko = new saiLabelEdit(this,{bound:[20,14,200,20],caption:"NPKO", readOnly:true});
		this.e_curr = new saiLabelEdit(this,{bound:[20,13,145,20],caption:"Curr NPKO", readOnly:true});				
		this.e_kurs = new saiLabelEdit(this,{bound:[170,13,50,20],caption:"Kurs", tag:1, labelWidth:0, tipeText:ttNilai, readOnly:true, text:"0"});		
		this.e_total = new saiLabelEdit(this,{bound:[700,13,220,20],caption:"Nilai SPB", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});
		
		this.p1 = new panel(this,{bound:[20,23,900,360],caption:"Data Item Pengajuan"});		
		this.sg = new saiGrid(this.p1,{bound:[1,20,this.p1.width-5,this.p1.height-45],colCount:10,tag:0,
		            colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Kode DRK","Nama DRK","Keterangan","DC","Nilai","Jenis"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[80,100,50,200,150,80,150,80,150,80]],
					readOnly:true,
					colFormat:[[8],[cfNilai]],					
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height-25,this.p1.width-1,25],buttonStyle:2,grid:this.sg});		
		
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		this.rearrangeChild(10,23);
		
		this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);		
		setTipeButton(tbHapus);		
		this.setTabChildIndex();		
	}
};
window.app_saku2_transaksi_siaga_fSpbVerBatal.extend(window.portalui_childForm);
window.app_saku2_transaksi_siaga_fSpbVerBatal.implement({	
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
					this.nilai=0;
					for (var i = 0; i < this.sg.rows.getLength();i++){
						if (this.sg.rowValid(i) && this.sg.cells(8,i) != ""){
							if (this.sg.cells(9,i) != "VER") {
								if (this.sg.cells(7,i) == "D") this.nilai += nilaiToFloat(this.sg.cells(8,i));
								if (this.sg.cells(7,i) == "C") this.nilai -= nilaiToFloat(this.sg.cells(8,i));
							}
						}
					}
					this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
					if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
						system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
						return false;
					}	
					else {	
						uses("server_util_arrayList");
						var sql = new server_util_arrayList();						
						sql.add("update gr_spb_m set nilai="+this.nilai+",no_ver='-' where no_spb='"+this.cb_spb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from gr_spbver_m where no_ver = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from gr_spb_j where jenis = 'VER' and no_spb='"+this.cb_spb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
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
			this.e_nb.setSQL("select a.no_ver, a.keterangan from gr_spbver_m a inner join gr_spb_m b on a.no_ver=b.no_ver and a.kode_lokasi=b.kode_lokasi "+
							 "where b.no_kaslist='-' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["a.no_ver","a.keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);			
		}
		if (sender == this.e_nb && this.e_nb.getText()!="") {
			var strSQL = "select a.tanggal,a.keterangan,a.nik_buat,b.nama as nama_buat,c.no_spb,c.keterangan as ket_spb,e.no_npko,c.kode_curr,c.kurs,c.nilai  "+
						 "from gr_spbver_m a "+
						 "       inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi "+	
						 "       inner join gr_spb_m c on a.no_ver=c.no_ver and a.kode_lokasi=c.kode_lokasi "+
						 "       inner join gr_npko_d d on c.no_spb=d.no_spb and d.kode_lokasi=c.kode_lokasi "+
						 "       inner join gr_npko_m e on d.no_npko=e.no_npko and d.kode_lokasi=e.kode_lokasi "+
						 "where a.no_ver='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
					this.dp_d1.setText(line.tanggal);					
					this.e_ket.setText(line.keterangan);
					this.cb_buat.setText(line.nik_buat,line.nama_buat);
					this.cb_spb.setText(line.no_spb,line.ket_spb);
					this.e_npko.setText(line.no_npko);
					this.e_curr.setText(line.kode_curr);
					this.e_kurs.setText(floatToNilai(line.kurs));
					this.e_total.setText(floatToNilai(line.nilai));
				} 
			}								
			strSQL = "select a.kode_akun,a.kode_pp,a.kode_drk,a.nilai_curr,b.nama as nama_akun,c.nama as nama_pp,isnull(d.nama,'-') as nama_drk,a.keterangan,a.dc,a.jenis "+
					 "from  gr_spb_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
					 "                 inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
					 "				   left  join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+
					 "where a.no_spb='"+this.cb_spb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.kode_akun,line.nama_akun,line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk,line.keterangan,line.dc,floatToNilai(line.nilai_curr),line.jenis]);
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
