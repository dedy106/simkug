window.app_saku2_transaksi_anggaran_fLoadSppd = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_anggaran_fLoadSppd.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku2_transaksi_anggaran_fLoadSppd";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Biaya Perjalanan Dinas : Load", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.e_tahun = new portalui_saiLabelEdit(this,{bound:[20,10,150,20],caption:"Tahun Anggaran",tag:2,maxLength:4,tipeText:ttAngka,change:[this,"doChange"]});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,10,100,18],visible:false}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No BPD", readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.cb_pp = new saiCBBL(this,{bound:[20,13,200,20],caption:"PP", multiSelection:false, maxLength:10, tag:2});		
		this.cb_akun = new saiCBBL(this,{bound:[20,11,200,20],caption:"Akun BPD", multiSelection:false, maxLength:10, tag:2});		
		this.e_total = new saiLabelEdit(this,{bound:[550,11,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.bHitung = new button(this,{bound:[755,11,80,18],caption:"Hitung",click:[this,"doHitung"]});			
		this.bUpload = new portalui_uploader(this,{bound:[840,11,80,18],param3:"object",param4:"gridupload",afterUpload:[this,"doAfterUpload"],autoSubmit:true});
		
		this.p1 = new portalui_panel(this,{bound:[20,189,900,450],caption:"Data Biaya Perjalan Dinas"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-50],colCount:17,tag:0,
				colTitle:["NIK","Nama","Band","Kode DRK","Nama DRK","Kode Rute","Nama Rute","Bulan","Jml Hari","Jml Trans","Tarif UH","Tarif Transport","Nilai UH","Nilai Trans","Total","Status","Kegiatan"],
				colWidth:[[16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[150,70,80,80,80,80,80,80,80,60,150,80,150,70,60,150,60]],
				colFormat:[[8,9,10,11,12,13,14],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],readOnly:true, defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,this.p1.height-25,this.p1.width-1,25],buttonStyle:bsAll, grid:this.sg1, pager:[this,"selectPage"]});		
		
		this.bRefresh = new portalui_imageButton(this.sgn,{bound:[this.sgn.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Clear",click:[this,"doClick"]});
		this.sgn.uploader.setParam3("object");
		this.sg1.setAllowBlank(true);
		
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		this.rearrangeChild(10,23);
				
		setTipeButton(tbSimpan);		
		this.setTabChildIndex();				
		
		if (this.app._userStatus=="A")
			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Daftar PP",true);
		else this.cb_pp.setSQL("select kode_pp, nama from pp where kode_bidang ='"+this.app._kodeBidang+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Daftar PP",true);
		
		this.cb_akun.setSQL("select kode_akun, nama from masakun where kode_akun in ('4122060001','4152010307','4122060005','4122060006') and kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Daftar Akun BPD",true);
		this.cb_akun.setText('4122060001');
		var tahun = parseFloat(this.dp_d1.year) + 1;
		this.e_tahun.setText(tahun);
		
		var data = this.dbLib.getDataProvider("select progress from agg_close where kode_lokasi = '"+this.app._lokasi+"' and modul = 'ABAU' and tahun = '"+this.e_tahun.getText()+"'",true);
		if (typeof data == "object"){
			this.prog = data.rs.rows[0].progress;
		}
	}
};
window.app_saku2_transaksi_anggaran_fLoadSppd.extend(window.portalui_childForm);
window.app_saku2_transaksi_anggaran_fLoadSppd.implement({
	doEditChange: function(sender){
		if (this.lastDataHR != this.cb_data.getText()){
			this.lastDataHR = this.cb_data.getText();			
		}
	},
	doAfterUpload: function(sender, result, data){		
	    try{   			
			this.dataUpload = data;
			if (result) {								
				this.sg1.clear();				
				this.selectPage(undefined, 1);
				this.sgn.setTotalPage(Math.ceil(this.dataUpload.rows.length / 20));
				this.sgn.rearrange();
				this.sgn.activePage = 0;	
			}else throw(data);					
   		}catch(e){
   		   this.sg1.hideLoading();
   		   systemAPI.alert(e,"Proses Berhenti.");
        }
	},
	selectPage: function(sender,page){
		var start = (page - 1) * 20;
		var finish = start + 20;
		finish = (finish > this.dataUpload.rows.length ? this.dataUpload.rows.length : finish);
		this.sg1.clear();
		for (var i=start; i < finish;i++){
			line = this.dataUpload.rows[i];
			this.sg1.appendData([line.nik,line.nama,line.band,line.kode_drk,line.nama_drk,line.kode_rute,line.nama_rute,line.bulan,floatToNilai(line.jml_hari),floatToNilai(line.jml_trans),floatToNilai(line.tarif_uh),floatToNilai(line.tarif_trans),floatToNilai(line.nilai_uh),floatToNilai(line.nilai_trans),floatToNilai(line.total),line.status,line.kegiatan]);
		}
		this.sg1.setNoUrut(start);
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
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk){
					this.standarLib.clearByTag(this, [0,1],undefined);				
					this.sg1.clear(1); 
					setTipeButton(tbSimpan);
				}
				break;
			case "simpan" :		
					if (this.prog != "0") {
						system.alert(this,"Transaksi tidak valid.","Transaksi ABAU telah di Close.");
						return false;
					}
					if (nilaiToFloat(this.e_total.getText()) <= 0 ) {
						system.alert(this,"Transaksi tidak valid.","Transaksi tidak boleh nol atau kurang.");
						return false;						
					}
					if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
						try{	
							this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_pd_m','no_pd',this.app._lokasi+"-PD"+this.e_tahun.getText()+".",'000'));
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();																													
							
							sql.add("delete from agg_pd_m where kode_pp='"+this.cb_pp.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and tahun ='"+this.e_tahun.getText()+"'");
							sql.add("delete from agg_pd_d where kode_pp='"+this.cb_pp.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and tahun ='"+this.e_tahun.getText()+"'");
							sql.add("delete from agg_d where modul='BSPPD' and kode_pp='"+this.cb_pp.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and tahun ='"+this.e_tahun.getText()+"'");
							
							sql.add("insert into agg_pd_m(no_pd,tahun,kode_pp,kode_akun,nilai,kode_lokasi) values "+
									"('"+this.e_nb.getText()+"','"+this.e_tahun.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_akun.getText()+"',"+parseNilai(this.e_total.getText())+",'"+this.app._lokasi+"')");
							var line;							
							for (var i=0; i < this.dataUpload.rows.length;i++){
								line = this.dataUpload.rows[i];										
								sql.add("insert into agg_pd_d(no_pd,kode_lokasi,tahun,nik,nama,kode_band,kode_drk,nama_drk,kode_rute,nama_rute,bulan,jml_hari,jml_trans,tarif_uh,tarif_trans,nilai_uh,nilai_trans,total,status,kegiatan,kode_pp) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_tahun.getText()+"','"+line.nik+"','"+line.nama+"','"+line.band+"','"+line.kode_drk+"','"+line.nama_drk+"','"+line.kode_rute+"','"+line.nama_rute+"','"+line.bulan+"',"+line.jml_hari+","+line.jml_trans+","+line.tarif_uh+","+line.tarif_trans+","+line.nilai_uh+","+line.nilai_trans+","+line.total+",'"+line.status+"','"+line.kegiatan+"','"+this.cb_pp.getText()+"')");
							}																					
							sql.add("insert into agg_d (kode_lokasi,kode_pk,kode_drk,kode_rka,kode_akun,kode_pp,periode,bulan,jumlah,volume,nilai,tahun,no_bukti,modul,progress,jenis_agg,keterangan) "+
									"select a.kode_lokasi,'-',a.kode_drk,0,b.kode_akun,a.kode_pp,a.tahun+a.bulan,a.bulan,1,1,a.total,a.tahun,a.no_pd,'BSPPD','0',a.status,a.kegiatan "+
									"from agg_pd_d a inner join agg_pd_m b on a.no_pd=b.no_pd and a.kode_lokasi=b.kode_lokasi "+									
									"where b.no_pd ='"+this.e_nb.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'");
												
							setTipeButton(tbAllFalse);
							this.dbLib.execArraySQL(sql);
						}catch(e){
							systemAPI.alert(e);
							setTipeButton(tbSimpan);
						}
					}
				break;
		}
	},
	doClick: function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_pd_m','no_pd',this.app._lokasi+"-PD"+this.e_tahun.getText()+".",'000'));
			this.cb_pp.setFocus();
		}		
	},			
	doChange: function(sender){	
		if (sender == this.e_tahun && this.e_tahun.getText()!= "") {						
			var data = this.dbLib.getDataProvider("select progress from agg_close where kode_lokasi = '"+this.app._lokasi+"' and modul = 'ABAU' and tahun = '"+this.e_tahun.getText()+"'",true);
			if (typeof data == "object"){
				this.prog = data.rs.rows[0].progress;
			}			
		}
	},
	doHitung:function(sender){				
		var data = this.dbLib.getDataProvider("select nik from agg_karyawan where tahun='"+this.e_tahun.getText()+"'",true);
		if (typeof data == "object"){
			this.dataJU = data;
			dataNIK = new arrayMap();
			for (var i in this.dataJU.rs.rows){
				line = this.dataJU.rs.rows[i];
				dataNIK.set(line.nik, line);
			}
		}		
		var data = this.dbLib.getDataProvider("select kode_drk from agg_rkm where kode_akun in ('"+this.cb_akun.getText()+"','4152010307','4122060005','4122060006') and tahun='"+this.e_tahun.getText()+"'",true);
		if (typeof data == "object"){
			this.dataJU = data;
			dataDRK = new arrayMap();
			for (var i in this.dataJU.rs.rows){
				line = this.dataJU.rs.rows[i];
				dataDRK.set(line.kode_drk, line);
			}
		}		
		var data = this.dbLib.getDataProvider("select kode_rute from agg_pd_trans where tahun='"+this.e_tahun.getText()+"'",true);
		if (typeof data == "object"){
			this.dataJU = data;
			dataRute = new arrayMap();
			for (var i in this.dataJU.rs.rows){
				line = this.dataJU.rs.rows[i];
				dataRute.set(line.kode_rute, line);
			}
		}	
		var total=0;		
		for (var j=0; j < this.dataUpload.rows.length;j++){
			line1 = this.dataUpload.rows[j];																
			if (dataNIK.get(line1.nik) == undefined) {
				system.alert(this,"Transaksi tidak valid.","NIK tidak terdaftar. [kode "+line1.nik+"]");
				return false;						
			}
			if (dataDRK.get(line1.kode_drk) == undefined) {
				system.alert(this,"Transaksi tidak valid.","DRK tidak terdaftar untuk Perjalanan Dinas. [kode "+line1.kode_drk+"]");
				return false;						
			}
			if (dataRute.get(line1.kode_rute) == undefined) {
				system.alert(this,"Transaksi tidak valid.","Rute tidak terdaftar. [kode "+line1.kode_rute+"]");
				return false;						
			}		
			if (line1.status != "T" && line1.status != "E") {
				system.alert(this,"Transaksi tidak valid.","Status tidak terdaftar [E=Lama,T=Baru]. [status "+line1.status+"]");
				return false;						
			}
			if (line1.bulan != "01" && line1.bulan != "02" && line1.bulan != "03" && 
			    line1.bulan != "04" && line1.bulan != "05" && line1.bulan != "06" && 
				line1.bulan != "07" && line1.bulan != "08" && line1.bulan != "09" && 
				line1.bulan != "10" && line1.bulan != "11" && line1.bulan != "12") {
				system.alert(this,"Transaksi tidak valid.","Bulan tidak terdaftar [01 - 12]. [bulan "+line1.bulan+"]");
				return false;						
			}
			//-----------------------------									
			var data2 = this.dbLib.getDataProvider("select substring(kode_band,1,2) as kode_band from agg_karyawan where nik='"+line1.nik+"'",true);
			if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
				var line2 = data2.rs.rows[0];											
				this.dataUpload.rows[j].band = line2.kode_band;
			}
			var data2 = this.dbLib.getDataProvider("select nilai from agg_pd_uhar where kode_band='"+line1.band+"' and tahun='"+this.e_tahun.getText()+"'",true);
			if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
				var line2 = data2.rs.rows[0];											
				this.dataUpload.rows[j].tarif_uh = parseFloat(line2.nilai);
			}
			var data2 = this.dbLib.getDataProvider("select nilai from agg_pd_trans where kode_rute='"+line1.kode_rute+"' and tahun='"+this.e_tahun.getText()+"'",true);
			if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
				var line2 = data2.rs.rows[0];											
				this.dataUpload.rows[j].tarif_trans = parseFloat(line2.nilai);
			}			
			this.dataUpload.rows[j].nilai_uh = parseFloat(line1.tarif_uh) * parseFloat(line1.jml_hari);
			this.dataUpload.rows[j].nilai_trans = parseFloat(line1.tarif_trans) * parseFloat(line1.jml_trans);
			this.dataUpload.rows[j].total = parseFloat(line1.nilai_trans) + parseFloat(line1.nilai_uh);
			total += parseFloat(line1.total);			
		}	
		this.e_total.setText(floatToNilai(total));
		this.selectPage(undefined, 1);		
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			switch(methodName){
				case "execArraySQL":
					if (result.toLowerCase().search("error") == -1){
						this.app._mainForm.pesan(2,"Transaksi Sukses tersimpan");
						this.app._mainForm.bClear.click();              
					}else {
						system.info(this, result,"");											
						setTipeButton(tbSimpan);
					}
				break;
			}
		}		
	}	
});
