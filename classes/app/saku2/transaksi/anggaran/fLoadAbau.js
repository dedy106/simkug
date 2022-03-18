window.app_saku2_transaksi_anggaran_fLoadAbau = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_anggaran_fLoadAbau.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku2_transaksi_anggaran_fLoadAbau";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Angg. Biaya Adm dan Umum: Load", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator;portalui_saiMemo");
		uses("portalui_saiGrid",true);		
		
		this.e_tahun = new portalui_saiLabelEdit(this,{bound:[20,10,150,20],caption:"Tahun Anggaran",tag:2,maxLength:4,tipeText:ttAngka,change:[this,"doChange"]});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,10,100,18],visible:false}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No ABAU", readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.cb_bidang = new saiCBBL(this,{bound:[20,11,200,20],caption:"Bidang", multiSelection:false, maxLength:10, tag:2});				
		this.e_total = new saiLabelEdit(this,{bound:[640,11,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.bHitung = new button(this,{bound:[845,11,80,18],caption:"Hitung",click:[this,"doHitung"]});			
		this.bUpload = new portalui_uploader(this,{bound:[930,11,80,18],param3:"object",param4:"gridupload",afterUpload:[this,"doAfterUpload"],autoSubmit:true});
		
		this.pc1 = new pageControl(this,{bound:[20,20,990,440], childPage:["Data Angg. Biaya Adm dan Umum","Pesan Kesalahan"]});		
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:12,tag:0,
				colTitle:["Kode DRK","Nama DRK","Kegiatan","Kode Akun","Kode PP","Kode Variabel","Tarif","Jumlah","Volume","Bulan","Total","Status"],
				colWidth:[[11,10,9,8,7,6,5,4,3,2,1,0],[60,80,60,80,80,80,80,60,80,150,150,80]],
				colFormat:[[6,7,10],[cfNilai,cfNilai,cfNilai]],readOnly:true, defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll, grid:this.sg1, pager:[this,"selectPage"]});		
		this.e_memo = new saiMemo(this.pc1.childPage[1],{bound:[5,24,690,280],labelWidth:0,tag:9,readOnly:true});
		
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
			this.cb_bidang.setSQL("select kode_bidang, nama from bidang",["kode_bidang","nama"],false,["Kode","Nama"],"where","Daftar Bidang",true);		
		else this.cb_bidang.setSQL("select kode_bidang, nama from bidang where kode_bidang='"+this.app._kodeBidang+"'",["kode_bidang","nama"],false,["Kode","Nama"],"and","Daftar Bidang",true);		
		var tahun = parseFloat(this.dp_d1.year) + 1;
		this.e_tahun.setText(tahun);		
	}
};
window.app_saku2_transaksi_anggaran_fLoadAbau.extend(window.portalui_childForm);
window.app_saku2_transaksi_anggaran_fLoadAbau.implement({	
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
			this.sg1.appendData([line.kode_drk,line.nama_drk,line.kegiatan,line.kode_akun,line.kode_pp,line.kode_var,floatToNilai(line.tarif),floatToNilai(line.jumlah),floatToNilai(line.volume),line.bulan,floatToNilai(line.total),line.status]);
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
							this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_abau_m','no_abau',this.app._lokasi+"-ABAU"+this.e_tahun.getText()+".",'000'));
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();																																				
							
							sql.add("delete from agg_abau_m where kode_lokasi='"+this.app._lokasi+"' and kode_bidang='"+this.cb_bidang.getText()+"' and tahun='"+this.e_tahun.getText()+"'");
							sql.add("delete from agg_abau_d where kode_lokasi='"+this.app._lokasi+"' and substring(kode_pp,3,1)='"+this.cb_bidang.getText()+"' and tahun='"+this.e_tahun.getText()+"'");
							sql.add("delete from agg_d where kode_lokasi='"+this.app._lokasi+"' and substring(kode_pp,3,1)='"+this.cb_bidang.getText()+"' and tahun='"+this.e_tahun.getText()+"' and modul='ABAU'");
							
							sql.add("insert into agg_abau_m(no_abau,kode_lokasi,kode_bidang,tahun,nilai,tgl_input,nik_user) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_bidang.getText()+"','"+this.e_tahun.getText()+"',"+parseNilai(this.e_total.getText())+",getdate(),'"+this.app._userLog+"')");
							var line;							
							for (var i=0; i < this.dataUpload.rows.length;i++){
								line = this.dataUpload.rows[i];										
								sql.add("insert into agg_abau_d(no_abau,kode_lokasi,tahun,kode_drk,kegiatan,kode_akun,kode_pp,kode_var,tarif,jumlah,volume,bulan,periode,total,status) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_tahun.getText()+"','"+line.kode_drk+"','"+line.kegiatan+"','"+line.kode_akun+"','"+line.kode_pp+"','"+line.kode_var+"',"+line.tarif+","+line.jumlah+","+line.volume+",'"+line.bulan+"','"+this.e_tahun.getText()+line.bulan+"',"+line.total+",'"+line.status+"')");
							}																					
							sql.add("insert into agg_d (kode_lokasi,kode_pk,kode_drk,kode_rka,kode_akun,kode_pp,periode,bulan,jumlah,volume,nilai,tahun,no_bukti,modul,progress,jenis_agg,keterangan) "+
									"select kode_lokasi,'-',kode_drk,0,kode_akun,kode_pp,periode,bulan,jumlah,volume,total,tahun,no_abau,'ABAU','0',status,kegiatan "+
									"from agg_abau_d  "+									
									"where no_abau='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
												
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_abau_m','no_abau',this.app._lokasi+"-ABAU"+this.e_tahun.getText()+".",'000'));
			this.cb_bidang.setFocus();
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
		var data = this.dbLib.getDataProvider("select kode_drk from agg_drk where tahun='"+this.e_tahun.getText()+"'",true);
		if (typeof data == "object"){
			this.dataJU = data;
			dataDRK = new arrayMap();
			for (var i in this.dataJU.rs.rows){
				line = this.dataJU.rs.rows[i];
				dataDRK.set(line.kode_drk, line);
			}
		}		
		var data = this.dbLib.getDataProvider("select kode_akun from masakun where kode_lokasi='99'",true);
		if (typeof data == "object"){
			this.dataJU = data;
			dataAkun = new arrayMap();
			for (var i in this.dataJU.rs.rows){
				line = this.dataJU.rs.rows[i];
				dataAkun.set(line.kode_akun, line);
			}
		}	
		var data = this.dbLib.getDataProvider("select kode_pp from pp where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",true);
		if (typeof data == "object"){
			this.dataJU = data;
			dataPP = new arrayMap();
			for (var i in this.dataJU.rs.rows){
				line = this.dataJU.rs.rows[i];
				dataPP.set(line.kode_pp, line);
			}
		}
		
		if (this.app._lokasi == "99") var status = " ";
		else var status = " and status = 'P/A'";
		
		var data = this.dbLib.getDataProvider("select kode_var from agg_var where tahun='"+this.e_tahun.getText()+"' "+status,true);
		if (typeof data == "object"){
			this.dataJU = data;
			dataVAR = new arrayMap();
			for (var i in this.dataJU.rs.rows){
				line = this.dataJU.rs.rows[i];
				dataVAR.set(line.kode_var, line);
			}
		}
		
		
		var total=0; var temu = false;		
		var msg  = "";
		this.e_memo.setText("");
		for (var j=0; j < this.dataUpload.rows.length;j++){
			line1 = this.dataUpload.rows[j];																
			if (dataDRK.get(line1.kode_drk) == undefined) {
				temu = true;
				msg+= "DRK tidak terdaftar. [kode : "+line1.kode_drk+"]\n";				
			}
			if (dataAkun.get(line1.kode_akun) == undefined) {
				temu = true;
				msg+= "Akun tidak terdaftar. [kode : "+line1.kode_akun+"]\n";								
			}
			if (dataPP.get(line1.kode_pp) == undefined) {
				temu = true;
				msg+= "PP tidak terdaftar. [kode : "+line1.kode_pp+"]\n";								
			}
			if (dataVAR.get(line1.kode_var) == undefined) {
				temu = true;
				msg+= "Kode variabel tidak terdaftar. [kode : "+line1.kode_var+"]\n";								
			}			
			if (line1.status != "T" && line1.status != "E") {
				temu = true;
				msg+= "Status tidak terdaftar. [kode : "+line1.kode_status+"]\n";								
			}
			if (line1.bulan != "01" && line1.bulan != "02" && line1.bulan != "03" && 
			    line1.bulan != "04" && line1.bulan != "05" && line1.bulan != "06" && 
				line1.bulan != "07" && line1.bulan != "08" && line1.bulan != "09" && 
				line1.bulan != "10" && line1.bulan != "11" && line1.bulan != "12") {
				temu = true;
				msg+= "Bulan tidak terdaftar. [kode : "+line1.bulan+"]\n";								
			}
			//-----------------------------									
			var data2 = this.dbLib.getDataProvider("select tarif from agg_norma_var where tahun = '"+this.e_tahun.getText()+"' and kode_var = '"+line1.kode_var+"' and kode_akun='"+line1.kode_akun+"'",true);
			if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
				var line2 = data2.rs.rows[0];											
				this.dataUpload.rows[j].tarif = parseFloat(line2.tarif);
			}						
			this.dataUpload.rows[j].total = Math.round(parseFloat(line1.tarif) * parseFloat(line1.jumlah) * parseFloat(line1.volume)) ;
			total += parseFloat(line1.total);	
		}			
		this.selectPage(undefined, 1);		
		if (!temu) this.e_total.setText(floatToNilai(total));
		else {
			this.e_memo.setText(msg);
			this.e_total.setText("0");
			system.alert(this,"Transaksi tidak valid.","Lihat daftar kesalahan.");
		}
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
