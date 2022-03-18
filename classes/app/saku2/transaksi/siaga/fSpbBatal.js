window.app_saku2_transaksi_siaga_fSpbBatal = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_siaga_fSpbBatal.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku2_transaksi_siaga_fSpbBatal";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Input SPB : Batal", 0);	
		
		this.maximize();		
		uses("portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Bukti", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});									
		this.e_ket = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"Untuk Pembayaran", readOnly:true});		
		this.l_tgl2 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal Bayar", underline:true});
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,11,100,18]}); 				
		this.cb_buat = new saiCBBL(this,{bound:[20,16,200,20],caption:"Dibuat Oleh", readOnly:true, tag:1});
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"Disetujui Oleh", readOnly:true, tag:1});
		this.cb_vendor = new saiCBBL(this,{bound:[20,14,200,20],caption:"Kepada", readOnly:true, tag:1});						
		this.cb_pp = new saiCBBL(this,{bound:[20,16,200,20],caption:"Unit Kerja", readOnly:true, tag:1});		
		this.cb_npko = new saiCBBL(this,{bound:[20,17,220,20],caption:"No NPKO", readOnly:true, tag:1});
		this.c_curr = new saiLabelEdit(this,{bound:[20,19,150,20],caption:"Curr - Kurs", readOnly:true});		
		this.e_kurs = new saiLabelEdit(this,{bound:[180,19,40,20],caption:"Kurs", tag:1, labelWidth:0, tipeText:ttNilai, readOnly:true, text:"0"});
		this.e_total = new saiLabelEdit(this,{bound:[700,19,220,20],caption:"Nilai SPB", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		
		this.p1 = new panel(this,{bound:[20,20,900,290],caption:"Data Item Akun"});		
		this.sg = new saiGrid(this.p1,{bound:[1,20,this.p1.width-5,this.p1.height-45],colCount:9,tag:0,
		            colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Kode DRK","Nama DRK","Nilai NPKO","SPB Original","SPB IDR"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[100,100,100,150,80,150,80,150,80]],
					readOnly:true,
					colFormat:[[6,7,8],[cfNilai,cfNilai,cfNilai]],										
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
window.app_saku2_transaksi_siaga_fSpbBatal.extend(window.portalui_childForm);
window.app_saku2_transaksi_siaga_fSpbBatal.implement({	
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
						
						sql.add("delete from gr_spb_m where no_spb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from gr_spb_j where no_spb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update gr_npko_d set no_spb='-' where no_spb='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						
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
			this.e_nb.setSQL("select no_spb, keterangan from gr_spb_m where kode_pp='"+this.app._kodePP+"' and no_ver='-' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_spb","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);
		}
		if (sender == this.e_nb && this.e_nb.getText()!="") {		
			var strSQL = "select a.tanggal,a.keterangan,a.due_date,a.kode_curr,a.kurs,a.nilai,a.no_npko,a.nik_buat,a.nik_setuju,a.kode_pp,a.kode_vendor,  "+
						 "       b.nama as nama_buat,bb.nama as nama_setuju,e.lingkup as ket_npko,f.nama as nama_pp,g.nama as nama_vendor "+
						 "from gr_spb_m a "+
						 "       inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi "+	
						 "       inner join karyawan bb on a.nik_setuju=bb.nik and a.kode_lokasi=bb.kode_lokasi "+							 
						 "       inner join gr_npko_d d on a.no_spb=d.no_spb and d.kode_lokasi=a.kode_lokasi "+
						 "       inner join gr_npko_m e on d.no_npko=e.no_npko and d.kode_lokasi=e.kode_lokasi "+
						 "       inner join pp f on a.kode_pp=f.kode_pp and a.kode_lokasi=f.kode_lokasi "+	
						 "       inner join vendor g on a.kode_vendor=g.kode_vendor and a.kode_lokasi=g.kode_lokasi "+	
						 "where a.no_spb='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){										
					this.dp_d1.setText(line.tanggal);					
					this.dp_d2.setText(line.due_date);				
					this.e_ket.setText(line.keterangan);
					this.cb_buat.setText(line.nik_buat,line.nama_buat);
					this.cb_app.setText(line.nik_setuju,line.nama_setuju);					
					this.cb_vendor.setText(line.kode_vendor,line.nama_vendor);
					this.cb_pp.setText(line.kode_pp,line.nama_pp);
					this.cb_npko.setText(line.no_npko,line.ket_npko);
					this.c_curr.setText(line.kode_curr);
					this.e_kurs.setText(floatToNilai(line.kurs));
					this.e_total.setText(floatToNilai(line.nilai));
				} 
			}					
			strSQL = "select a.kode_akun,a.kode_pp,a.kode_drk,b.nama as nama_akun,c.nama as nama_pp,d.nama as nama_drk,x.nilai as nilai_npko,a.nilai_curr,a.nilai "+
					 "from  gr_spb_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
					 "                 inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
					 "                 inner join gr_npko_d x on a.no_spb=x.no_spb and a.kode_lokasi=x.kode_lokasi and a.kode_akun=x.kode_akun "+
					 "				   inner join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+
					 "where a.no_spb='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.jenis='NPKO' ";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					this.sg.appendData([line.kode_akun,line.nama_akun,line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk,floatToNilai(line.nilai_npko),floatToNilai(line.nilai_curr),floatToNilai(line.nilai)]);
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
