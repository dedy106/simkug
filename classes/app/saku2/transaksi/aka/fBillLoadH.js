window.app_saku2_transaksi_aka_fBillLoadH = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_aka_fBillLoadH.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku2_transaksi_aka_fBillLoadH";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Load Data Tagihan : Pembatalan", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Load", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"Deskripsi", readOnly:true});			
		
		this.p1 = new portalui_panel(this,{bound:[20,189,900,354],caption:"Data Billing Mahasiswa"});
		this.sg = new portalui_saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-45],colCount:11,
				colTitle:["NIM","Nama","Jalur","Beasiswa","Status","Prodi","Angkatan","BPP","UP3","SDP2","Total"],
				colFormat:[[7,8,9,10],[cfNilai,cfNilai,cfNilai,cfNilai]],
				readOnly:true, defaultRow:1
		});		
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,this.p1.height-25,this.p1.width-1,25],buttonStyle:3, grid:this.sg, pager:[this,"doPager"]});
		this.sg.setAllowBlank(true);
		
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		this.rearrangeChild(10,23);
		
		this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
		
		setTipeButton(tbHapus);				
	}
};
window.app_saku2_transaksi_aka_fBillLoadH.extend(window.portalui_childForm);
window.app_saku2_transaksi_aka_fBillLoadH.implement({
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
					if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
						try{
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();	
							sql.add("delete from aka_bill_m where no_bill ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
							sql.add("delete from aka_bill_d where no_bill ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
							sql.add("delete from aka_bill_load where no_bill ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
							sql.add("delete from aka_bill_j where no_bill ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
							setTipeButton(tbAllFalse);
							this.dbLib.execArraySQL(sql);
						}catch(e){
							systemAPI.alert(e);
						}
					}
				break;
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else this.e_periode.setText(this.app._periode);
	},	
	doChange: function(sender){
		if (sender == this.e_periode && this.e_periode.getText()!="") {
			this.e_nb.setSQL("select no_bill, keterangan from aka_bill_m where posted ='F' and jenis = 'BLOAD' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_bill","keterangan"],false,["No Load","Deskripsi"],"and","Daftar Bukti Load Billing",true);			
		}
		if (sender == this.e_nb && this.e_nb.getText()!="") {
			var data = this.dbLib.getDataProvider("select convert(varchar,tanggal,103) as tanggal,a.keterangan "+
					   "from aka_bill_m a where a.no_bill='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.dp_d1.setText(line.tanggal);
					this.e_ket.setText(line.keterangan);					
				} 
			}
			var data = this.dbLib.getDataProvider("select nim,nama,kode_jalur,flag_bea,flag_status,kode_jur,kode_akt,bpp,up3,sdp2,bpp+up3+sdp2 as total "+
			           "from aka_bill_load where no_bill='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn.rearrange();
				this.doTampilData(1);
			} else this.sg.clear(1);
		}
	},
	doTampilData: function(page) {		
		this.sg.clear(); 
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg.appendData([line.nim,line.nama,line.kode_jalur,line.flag_bea,line.flag_status,line.kode_jur,line.kode_akt,floatToNilai(line.bpp),floatToNilai(line.up3),floatToNilai(line.sdp2),floatToNilai(line.total)]);
		}
		this.sg.setNoUrut(start);
	},
	doClick: function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'aka_bill_m','no_bill',this.app._lokasi+"-BIL"+this.e_periode.getText().substr(2,4)+".",'000'));
			this.e_ket.setFocus();
		}
		if (sender == this.bRefresh) this.sg.clear(1);
	},	
	doPager: function(sender, page) {
		this.doTampilData(page);
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			switch(methodName){
				case "execArraySQL":
					if (result.toLowerCase().search("error") == -1){
						this.app._mainForm.pesan(2,"Transaksi Sukses Terhapus.("+ this.e_nb.getText()+")");
						this.app._mainForm.bClear.click();              
					}else
						system.info(this, result,"");											
				break;
			}
		}		
	}
});
