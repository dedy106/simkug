window.app_saku2_transaksi_siaga_fLoadAbau = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_siaga_fLoadAbau.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku2_transaksi_siaga_fLoadAbau";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penyusunan Anggaran: Load", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator;portalui_saiMemo");
		uses("portalui_saiGrid",true);		
		
		this.e_tahun = new portalui_saiLabelEdit(this,{bound:[20,10,150,20],caption:"Tahun Anggaran",tag:2,maxLength:4,tipeText:ttAngka,change:[this,"doChange"]});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,10,100,18],visible:false}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti", readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.cb_pp = new saiCBBL(this,{bound:[20,11,200,20],caption:"PP", multiSelection:false, maxLength:10, tag:2});				
		this.e_total = new saiLabelEdit(this,{bound:[720,11,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.bUpload = new portalui_uploader(this,{bound:[930,11,80,18],param3:"object",param4:"gridupload",afterUpload:[this,"doAfterUpload"],autoSubmit:true});
		
		this.pc1 = new pageControl(this,{bound:[20,20,990,440], childPage:["Data Angg. Biaya Adm dan Umum","Pesan Kesalahan"]});		
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:10,tag:0,
				colTitle:["Kode DRK","Kegiatan","Kode Akun","Kode PP","Tarif","Jumlah","Volume","Bulan","Total","Status"],
				colWidth:[[9,8,7,6,5,4,3,2,1,0],[60,80,60,80,80,80,60,80,280,80]],
				colFormat:[[4,5,6,8],[cfNilai,cfNilai,cfNilai,cfNilai]],readOnly:true, defaultRow:1});		
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
				
		this.cb_pp.setSQL("select kode_pp, nama from pp where kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"where","Daftar PP",true);		
		
		var tahun = parseFloat(this.dp_d1.year) + 1;
		this.e_tahun.setText(tahun);		
	}
};
window.app_saku2_transaksi_siaga_fLoadAbau.extend(window.portalui_childForm);
window.app_saku2_transaksi_siaga_fLoadAbau.implement({	
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
			
			this.doHitung();
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
			this.sg1.appendData([line.kode_drk,line.kegiatan,line.kode_akun,line.kode_pp,floatToNilai(line.tarif),floatToNilai(line.jumlah),floatToNilai(line.volume),line.bulan,floatToNilai(line.total),line.status]);
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
					if (nilaiToFloat(this.e_total.getText()) <= 0 ) {
						system.alert(this,"Transaksi tidak valid.","Transaksi tidak boleh nol atau kurang.");
						return false;						
					}
					if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
						try{							
							this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_abau_m','no_abau',this.app._lokasi+"-ABAU"+this.e_tahun.getText()+".",'000'));
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();																																																		
							sql.add("insert into agg_abau_m(no_abau,kode_lokasi,kode_pp,tahun,nilai,tgl_input,nik_user) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"','"+this.e_tahun.getText()+"',"+parseNilai(this.e_total.getText())+",getdate(),'"+this.app._userLog+"')");
							var line;							
							for (var i=0; i < this.dataUpload.rows.length;i++){
								line = this.dataUpload.rows[i];																		
								sql.add("insert into agg_d(kode_lokasi,kode_drk,kode_akun,kode_pp,periode,bulan,tarif,jumlah,volume,nilai,tahun,no_bukti,modul,progress,jenis_agg,keterangan) values "+
										"('"+this.app._lokasi+"','"+line.kode_drk+"','"+line.kode_akun+"','"+line.kode_pp+"','"+this.e_tahun.getText()+line.bulan+"','"+line.bulan+"',"+line.tarif+","+line.jumlah+","+line.volume+","+line.total+",'"+this.e_tahun.getText()+"','"+this.e_nb.getText()+"','ABAU','0','"+line.status+"','"+line.kegiatan+"')");
							}																																							
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
			this.cb_pp.setFocus();
		}		
	},		
	doHitung:function(sender){										
		var data = this.dbLib.getDataProvider("select kode_drk from drk where kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.e_tahun.getText()+"'",true);
		if (typeof data == "object"){
			this.dataJU = data;
			dataDRK = new arrayMap();
			for (var i in this.dataJU.rs.rows){
				line = this.dataJU.rs.rows[i];
				dataDRK.set(line.kode_drk, line);
			}
		}
		var data = this.dbLib.getDataProvider("select kode_akun from masakun where kode_lokasi='"+this.app._lokasi+"'",true);
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
