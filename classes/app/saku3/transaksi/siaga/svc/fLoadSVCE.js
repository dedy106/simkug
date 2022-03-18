window.app_saku3_transaksi_siaga_svc_fLoadSVCE = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_svc_fLoadSVCE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_svc_fLoadSVCE";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Biling SVC: Pembatalan", 0);	
		
		uses("portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator;portalui_saiMemo");
		uses("portalui_saiGrid",true);		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 		
		this.cb_cabang = new saiCBBL(this,{bound:[20,13,220,20],caption:"Cabang", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});				
		this.e_nb = new saiCBBL(this,{bound:[20,16,240,20],caption:"No Bukti", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,18,450,20],caption:"Deskripsi", maxLength:150});								
		this.cb_pp = new saiCBBL(this,{bound:[20,16,220,20],caption:"PP", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});						
		this.cb_drk = new saiCBBL(this,{bound:[20,13,220,20],caption:"DRK", multiSelection:false, maxLength:10, tag:2});		
		this.cb_buat = new saiCBBL(this,{bound:[20,14,220,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});				
		this.cb_app = new saiCBBL(this,{bound:[20,15,220,20],caption:"NIK Mengetahui", multiSelection:false, maxLength:10, tag:2});						
						
		this.pc1 = new pageControl(this,{bound:[20,20,980,250], childPage:["Rekapitulasi Nilai","Detail Data Billing"]});		
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,11,200,20],caption:"Total Nilai", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_diskon = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,200,20],caption:"Total Diskon", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_neto = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,200,20],caption:"Total Netto", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_ppn = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,200,20],caption:"Total PPN", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_biaya = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,200,20],caption:"Total Biaya", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_materai = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,200,20],caption:"Total Materai", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_total = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_bayar = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,18,200,20],caption:"Total Pelunasan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:10,tag:0,
				colTitle:["No Invoice","Customer","Nilai","Diskon","Netto","PPN","Biaya","Materai","Total","Nilai Bayar"],
				colWidth:[[9,8,7,6,5,4,3,2,1,0],[100,100,100,100,100,100,100,100,200,100]],
				colFormat:[[2,3,4,5,6,7,8,9],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],readOnly:true, defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager"]});
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		
		setTipeButton(tbHapus);
		this.maximize();		
		this.setTabChildIndex();
		
		try {			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.cb_pp.setText(this.app._kodePP,this.app._namaPP);			
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);									
						
			this.cb_cabang.setSQL("select distinct a.kode_cabang,b.nama from gr_karyawan_cab a inner join gr_cabang b on a.kode_cabang=b.kode_cabang and a.kode_lokasi=b.kode_lokasi where a.flag_aktif ='1' and a.kode_lokasi='"+this.app._lokasi+"'",["kode_cabang","nama"],false,["Kode","Nama"],"and","Data Cabang",true);			
			var data = this.dbLib.getDataProvider("select a.kode_cabang,b.nama from gr_karyawan_cab a inner join gr_cabang b on a.kode_cabang=b.kode_cabang and a.kode_lokasi=b.kode_lokasi where a.flag_aktif ='1' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_cabang.setText(line.kode_cabang,line.nama);
			} else this.cb_cabang.setText("","");	

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_svc_fLoadSVCE.extend(window.childForm);
window.app_saku3_transaksi_siaga_svc_fLoadSVCE.implement({	
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
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg1.clear(1); 										
					setTipeButton(tbHapus);					
				break;
			case "hapus" : 				
				if (this.e_bayar.getText() != "0"){
					system.alert(this,"Data sudah pernah dilunasi.","Data tidak dapat dibatalkan.");
					return false;
				}
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);				
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from gr_svc_m where no_svc='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from gr_svc_j where no_svc='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("delete from gr_svc_d where no_svc='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;			
		}
	},
	doSelectDate: function(sender, y,m,d){		
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12)this.e_periode.setText(y+""+m);			
		else this.e_periode.setText(this.app._periode);									
	},
	doChange:function(sender){		
		if (sender == this.e_periode || sender == this.cb_cabang) {
			if (this.e_periode.getText()!="" && this.cb_cabang.getText()!="") 
				this.e_nb.setSQL("select no_svc,keterangan from gr_svc_m where posted='F' and kode_cabang='"+this.cb_cabang.getText()+"' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_svc","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);							 		
		}
		if (sender == this.e_nb && this.e_nb.getText()!="") {						
			var data = this.dbLib.getDataProvider("select a.periode,a.tanggal,a.keterangan,a.kode_pp,b.nama as nama_pp,a.nik_buat,c.nama as nama_buat,a.nik_app,d.nama as nama_app,a.kode_drk,e.nama as nama_drk "+
			           "from gr_svc_m a inner join pp b on a.kode_pp = b.kode_pp and a.kode_lokasi=b.kode_lokasi "+	
					   "                 inner join karyawan c on a.nik_buat = c.nik and a.kode_lokasi=c.kode_lokasi "+	
					   "                 inner join karyawan d on a.nik_app = d.nik and a.kode_lokasi=d.kode_lokasi "+	
					   "                 inner join drk e on a.kode_drk = e.kode_drk and a.kode_lokasi=e.kode_lokasi and e.tahun=substring(a.periode,1,4)"+	
					   "where a.no_svc='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
                    this.perLama = line.periode;
					this.dp_d1.setText(line.tanggal);
					this.e_ket.setText(line.keterangan);					
					this.cb_pp.setText(line.kode_pp,line.nama_pp);										
					this.cb_drk.setText(line.kode_drk,line.nama_drk);										
					this.cb_buat.setText(line.nik_buat,line.nama_buat);										
					this.cb_app.setText(line.nik_app,line.nama_app);										
					
				} 
			}			
			var strSQL = "select a.no_invoice,a.nama_cust,a.nilai,a.diskon,a.neto,a.ppn,a.biaya,a.materai,a.total,isnull(c.bayar,0) as bayar "+
			             "from gr_svc_d a  "+
			             "left join (select no_invoice,kode_lokasi,sum(case dc when 'D' then (nilai_kas+nilai_lain) else -(nilai_kas+nilai_lain) end) as bayar from gr_svcbayar_d group by no_invoice,kode_lokasi) c on a.no_invoice=c.no_invoice and a.kode_lokasi=c.kode_lokasi "+
						 "where a.no_svc='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn.rearrange();
				this.doTampilData(1);
			} else this.sg.clear(1);
			
			var line;
			var nilai = diskon = neto = ppn = biaya = materai = total = bayar = 0;
			
			for (var i=0; i < this.dataJU.rs.rows.length;i++){				
				line = this.dataJU.rs.rows[i];	
				nilai += parseFloat(line.nilai);
				diskon += parseFloat(line.diskon);
				neto += parseFloat(line.neto);
				ppn += parseFloat(line.ppn);
				biaya += parseFloat(line.biaya);
				materai += parseFloat(line.materai);				
				total += parseFloat(line.total);				
				bayar += parseFloat(line.bayar);				
			}			
			this.e_nilai.setText(floatToNilai(nilai));
			this.e_diskon.setText(floatToNilai(diskon));
			this.e_neto.setText(floatToNilai(neto));
			this.e_ppn.setText(floatToNilai(ppn));
			this.e_biaya.setText(floatToNilai(biaya));
			this.e_materai.setText(floatToNilai(materai));
			this.e_total.setText(floatToNilai(total));			
			this.e_bayar.setText(floatToNilai(bayar));						
		}
	},				
	doTampilData: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg1.appendData([line.no_invoice,line.nama_cust,floatToNilai(line.nilai),floatToNilai(line.diskon),floatToNilai(line.neto),floatToNilai(line.ppn),floatToNilai(line.biaya),floatToNilai(line.materai),floatToNilai(line.total),floatToNilai(line.bayar)]);
		}
		this.sg1.setNoUrut(start);		
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL":
					if (result.toLowerCase().search("error") == -1){
						this.app._mainForm.pesan(2,"Transaksi Sukses tereksekusi");
						this.app._mainForm.bClear.click();              
					}else {
						system.info(this, result,"");											
						setTipeButton(tbSimpan);
					}
					break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}	
});