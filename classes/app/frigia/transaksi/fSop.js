window.app_frigia_transaksi_fSop = function(owner)
{
	if (owner)
	{
		window.app_frigia_transaksi_fSop.prototype.parent.constructor.call(this, owner);
		this.className = "app_frigia_transaksi_fSop";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Load Data Stok Opname", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No SOP", readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"Deskripsi", maxLength:150});			
		this.cb_gudang = new saiCBBL(this,{bound:[20,17,200,20],caption:"Gudang", multiSelection:false, maxLength:10, tag:2});
		this.bUpload = new portalui_uploader(this,{bound:[620,17,100,20],param3:"object",param4:"gridupload",afterUpload:[this,"doAfterUpload"],autoSubmit:true});		
		
		this.p1 = new portalui_panel(this,{bound:[20,189,700,364],caption:"Data SOP"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-50],colCount:6,
				colTitle:["Kode Barang","Nama Barang","Satuan","Stok","SOP","Selisih"],
				colWidth:[[5,4,3,2,1,0],[90,90,90,80,200,100]],
				colFormat:[[3,4,5],[cfNilai,cfNilai,cfNilai]],
				readOnly:true, defaultRow:1
		});		
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,this.p1.height-25,this.p1.width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"selectPage"]});		
		this.bRefresh = new portalui_imageButton(this.sgn,{bound:[this.sgn.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Clear",click:[this,"doClick"]});
		this.sgn.uploader.setParam3("object");
		this.sg1.setAllowBlank(true);
		
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		this.rearrangeChild(10,23);
		
		this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);		
		this.cb_gudang.setSQL("select kode_gudang, nama from fri_barang_gudang where kode_lokasi = '"+this.app._lokasi+"'",["kode_gudang","nama"],false,["Kode","Nama"],"and","Data Gudang",true);
		
		setTipeButton(tbSimpan);				
	}
};
window.app_frigia_transaksi_fSop.extend(window.portalui_childForm);
window.app_frigia_transaksi_fSop.implement({
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
			var strSQL = "select kode_brg,kode_lokasi,sum(case dc when 'D' then jumlah+bonus else -(jumlah+bonus) end) as stok "+
						 "from fri_barang_d where kode_gudang='"+this.cb_gudang.getText()+"' and kode_lokasi='"+this.app._lokasi+"' group by kode_lokasi,kode_brg";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
			}				
			var line; var line2;
			for (var i=0; i < this.dataUpload.rows.length;i++){
				line = this.dataUpload.rows[i];
				for (var j=0;j < this.dataJU.rs.rows.length;j++){
					if (line.kode_brg == this.dataJU.rs.rows[j].kode_brg) {
						line.stok = parseFloat(this.dataJU.rs.rows[j].stok);
						line.selisih = parseFloat(line.sop) - parseFloat(this.dataJU.rs.rows[j].stok);
					}
				}
				this.dataUpload.rows[i] = line;
			}
			this.selectPage(undefined, 1);
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
			this.sg1.appendData([line.kode_brg,line.nama,line.satuan,floatToNilai(line.stok),floatToNilai(line.sop),floatToNilai(line.selisih)]);
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
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'fri_sop_m','no_sop',this.app._lokasi+"-SOP"+this.e_periode.getText().substr(2,4)+".",'000'));
					if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
						try{
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();								
						
							sql.add("insert into fri_sop_m(no_sop,kode_lokasi,tanggal,no_dokumen,keterangan,nik_buat,kode_gudang,periode,nik_user,tgl_input,no_link,no_del) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','-','"+this.e_ket.getText()+"','-','"+this.cb_gudang.getText()+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',now(),'-','-')");
					
							var line;
							for (var i=0; i < this.dataUpload.rows.length;i++){
								line = this.dataUpload.rows[i];
								sql.add("insert into fri_sop_d (no_sop,kode_lokasi,periode,nu,kode_brg,stok,sop,selisih) values "+
										"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"',"+i+",'"+line.kode_brg+"',"+line.stok+","+line.sop+","+line.selisih+")");
							}
							sql.add("insert into fri_barang_d(no_bukti,kode_lokasi,nu,kode_brg,harga,jumlah,bonus,modul,dc,periode,tanggal,kode_gudang,pdisk) "+
									"select no_sop,kode_lokasi,nu,kode_brg,0,abs(selisih),0,'SOP',case when selisih < 0 then 'C' else 'D' end,'"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_gudang.getText()+"',0 "+
									"from fri_sop_d where no_sop='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
							
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
		this.e_periode.setText(y+""+m);
		this.e_nb.setText("");
	},	
	doClick: function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'fri_sop_m','no_sop',this.app._lokasi+"-SOP"+this.e_periode.getText().substr(2,4)+".",'000'));
			this.e_ket.setFocus();
		}
		if (sender == this.bRefresh) this.sg1.clear(1);
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
