/***********************************************************************************************
*	Copyright (c) 2008 SAI, PT   and Others 		
*	 All rights reserved. This program and the accompanying materials
*	 are made available under the terms of the Common Public License v1.0
*	 which accompanies this distribution, and is available at												
*	Contributors 
* 			SAI, PT											
***********************************************************************************************/
window.app_portal_transaksi_fUploadPoin = function(owner)
{
	if (owner)
	{
		window.app_portal_transaksi_fUploadPoin.prototype.parent.constructor.call(this,owner);
		this.className  = "app_portal_transaksi_fUploadPoin";
		this.setTop(60);		
		this.maximize();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Upload Poin Sales", 0);				
		this.itemsValue = new portalui_arrayList();		
		uses("portalui_saiCBBL;portalui_datePicker;portalui_saiGrid;portalui_sgNavigator;portalui_checkBox");
		this.ed_periode = new portalui_saiLabelEdit(this,{bound:[20,21,182,20],caption:"Periode",readOnly:true,tag:9});
		this.l2 = new portalui_label(this,{bound:[20,22,100,18],caption:"Tanggal",underline:true});
		this.dp_tgl = new portalui_datePicker(this,{bound:[120,22,82,18], selectDate:"doSelectedDate"});
		this.ed_sk = new portalui_saiCBBL(this,{bound:[20,20,240,20],caption:"No Upload",readOnly:true, tag:1,rightLabelVisible:false,btnClick:[this,"doFindBtnClick"]});		
		this.bGen = new portalui_button(this,{bound:[270,20,80,20],caption:"Generate",icon:"url(icon/"+system.getThemes()+"/process.png)",click:"doGen"});						
		this.ed_ket = new portalui_saiLabelEdit(this,{bound:[20,21,500,20],caption:"Keterangan"});
		this.cb1 = new portalui_checkBox(this,{bound:[530,21,50,20],caption:"Aktif"});
		this.p1 = new portalui_panel(this,{bound:[20,23,600,260],caption:"Data"});
    	this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,598,210],colCount:15,
                        colTitle:["Cabang","Kode Sales","Kode Cust","Nama Cust","Tgl Faktur","No Faktur","Kota","Kode Produk","Satuan","Poin","Jumlah","Bonus","Harga","Sub Total","Nilai"],
                        colWidth:[[14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[80,80,80,80,80,80,80,100,100,250,100,250,100,150,100]],readOnly:true,colFormat:[[14,13,12,11,10,9],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]]});		
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,234,598,25],grid:this.sg1,buttonStyle:4,afterUpload:[this,"doAfterUpload"], pager:[this,"doSelectedPage"]});
		this.sgn.uploader.setParam3("object");
		
		
		setTipeButton(tbSimpan);
		
		this.rearrangeChild(10,23);
		this.setTabChildIndex();
		try
		{
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);					
			this.standarLib = new util_standar();			
			this.ed_sk.onChange.set(this,"doChange");
			this.maxRows = 500;
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_portal_transaksi_fUploadPoin.extend(window.portalui_childForm);
window.app_portal_transaksi_fUploadPoin.implement({
		mainButtonClick: function(sender){
			if (sender == this.app._mainForm.bClear)
				system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");
			else if (sender == this.app._mainForm.bSimpan)
				system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");
			else if (sender == this.app._mainForm.bEdit)
				system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");
			else if (sender == this.app._mainForm.bHapus)
				system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");			
	},
	doModalResult: function(event, modalResult){
		this.event = event;
		var flag = this.cb1.isSelected() ? "1" : "0";
		switch (event)
		{
			case "clear" :
				if (modalResult == mrOk)
				{				
					this.standarLib.clearByTag(this, new Array("0","1"), this.ed_sk);				
				}
			break;
			case "simpan" :
				if (modalResult == mrOk && (this.standarLib.checkEmptyByTag(this, new Array("0","1"))))
				{
					try
					{
						uses("server_util_arrayList",true);
						sql = new server_util_arrayList();
						sql.add("insert into portal_poin_m(no_poin, periode, kode_lokasi, keterangan, flag_aktif,nik_user, tanggal)values('"+this.ed_sk.getText()+"','"+this.ed_periode.getText()+"','"+this.app._lokasi+"','"+this.ed_ket.getText()+"','"+flag+"','"+this.app._userLog+"','"+this.dp_tgl.getDateString()+"')");
						var line,values,script = "";						
						for (var i in this.dataUpload.rows){
							line = this.dataUpload.rows[i];
							if (script != "") script +=",";
							values = ["'"+this.ed_sk.getText()+"'","'"+this.app._lokasi+"'"];
							for (var c in line) values.push("'"+line[c]+"'");
							script += "("+values+")";
						}
						if (script !="") sql.add("insert into portal_poin_d(no_poin, kode_lokasi,cabang, kode_sales, kode_cust, nama_cust, tgl_faktur, no_faktur, kota, kode_produk, sat, poin, jumlah, bonus, harga, subttl, nilai)values " + script);
						this.dbLib.execArraySQL(sql);												
					}
					catch(e)
					{
						system.alert(this, e,"");
					}
				}
			break;
			case "ubah" :
				if (modalResult == mrOk && (this.standarLib.checkEmptyByTag(this, new Array("0","1"))))
				{
					try
					{
						uses("server_util_arrayList",true);
						sql = new server_util_arrayList();
						sql.add("delete from portal_poin_d where no_poin ='"+this.ed_sk.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
						sql.add("update portal_poin_m set keterangan = '"+this.ed_ket.getText()+"',tanggal='"+this.dp_tgl.getDateString()+"',periode='"+this.ed_periode.getText()+"', flag_aktif = '"+flag+"' where no_poin ='"+this.ed_sk.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
						var line,script = "";						
						for (var i in this.dataUpload.rows){
							line = this.dataUpload.rows[i];
							if (script != "") script +=",";
							values = ["'"+this.ed_sk.getText()+"'","'"+this.app._lokasi+"'"];
							for (var c in line) values.push("'"+line[c]+"'");
							script += "("+values+")";							
						}
						if (script !="") sql.add("insert into portal_poin_d(no_poin, kode_lokasi,cabang, kode_sales, kode_cust, nama_cust, tgl_faktur, no_faktur, kota, kode_produk, sat, poin, jumlah, bonus, harga, subttl, nilai)values " + script);
						this.dbLib.execArraySQL(sql);												
					}
					catch(e)
					{
						system.alert(this, e,"");
					}
				}
			break;
			case "hapus" :
			   if (modalResult == mrOk && (this.standarLib.checkEmptyByTag(this, new Array("0","1"))))
			   {
					try
					{
						uses("server_util_arrayList",true);
						sql = new server_util_arrayList();
						sql.add("delete from  portal_poin_m where no_poin = '"+this.ed_sk.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add("delete from  portal_poin_d where no_poin = '"+this.ed_sk.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
						this.dbLib.execArraySQL(sql);						
					}
					catch(e)
					{
						system.alert(this, e,"");
					}
			   }
			break;
		}		
	},
	doFindBtnClick: function(sender){
		if (sender == this.ed_sk){
			this.standarLib.showListData(this, "Data Jenis Harga",sender,undefined,
										  "select no_sk,keterangan from portal_poin_m where kode_lokasi = '"+this.app._lokasi+"'  ",
										  "select count(*) from portal_poin_m where kode_lokasi = '"+this.app._lokasi+"' ",
										  ["no_poin","keterangan"],"where",["No Poin","Keterangan"]);
		}
	},
	doRequestReady:function(sender, methodName, result){
		if (sender == this.dbLib)
		{
			switch	(methodName)
			{
				case "execArraySQL" :
					if (result.toLowerCase().search("error") == -1){
						this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.ed_sk.getText()+")");
						this.app._mainForm.bClear.click();						
					}else this.app.alert(this,result); 
				break;
			}
		}		
	},
	doGen: function(sender){	
		this.ed_sk.setText(this.standarLib.noBuktiOtomatis(this.dbLib, "portal_poin_m", "no_poin", "POIN"+this.ed_periode.getText(),"000000"));	
	},	
	doAfterUpload: function(sender, result, data, fileName){
        try{
            var line, namaakun, namapp, namacust, namavendor, namakary,debet = 0, kredit = 0;
            if (typeof data != "string"){
                this.sg1.clear();
				var values;
                for(var i in data.rows){
                    line = data.rows[i];                   
					if (i > this.maxRows) break;					
					values = [];
                    for (var c in line) values.push(line[c]);
					this.sg1.appendData(values);
					
                } 
				this.dataUpload = data;
				this.sgn.setTotalPage(Math.ceil(data.rows.length / this.maxRows));
				this.sgn.rearrange();
            }
        }catch(e){
            systemAPI.alert(e+" "+fileName,data);
        }
    },
	doChange: function(sender){
		if (sender == this.ed_sk){
			var data = this.dbLib.getDataProvider("select a.periode, a.keterangan,a.tanggal, a.flag_aktif, "+
				" b.cabang, b.kode_sales, b.kode_cust, b.nama_cust, b.tgl_faktur, b.no_faktur, b.kota, b.kode_produk, b.sat, b.poin, b.jumlah, b.bonus, b.harga, b.subttl, b.nilai "+
				" from portal_poin_m a inner join portal_poin_d b on b.no_poin = a.no_poin and b.kode_lokasi = a.kode_lokasi "+
				//" left outer join portal_produk c on c.kode_produk = b.kode_produk and c.kode_lokasi = a.kode_lokasi "+
				" where a.kode_lokasi = '"+this.app._lokasi+"' and a.no_poin = '"+sender.getText()+"' ",true);
			if (typeof data != "string"){
				if (data.rs.rows[0] != undefined){				
					setTipeButton(tbUbahHapus);
					this.ed_ket.setText(data.rs.rows[0].keterangan);
					this.ed_periode.setText(data.rs.rows[0].periode);
					this.dp_tgl.setText(data.rs.rows[0].tanggal);
					this.cb1.setSelected(data.rs.rows[0].flag_aktif == "1");
					var line,values;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];
						if (i > this.maxRows) break;
						values = [];						
						for (var c in line) {
							if (c != "periode" && c != "keterangan" && c != "tanggal" && c != "flag_aktif")
								values.push(line[c]);
						}
						this.sg1.appendData(values);
					}
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length / this.maxRows));
					this.sgn.rearrange();
					this.sg1.doDisableCtrl();
					this.dataUpload = data.rs;
				}else setTipeButton(tbSimpan);
			}else setTipeButton(tbSimpan);				
		}
	},
	doSelectedPage: function(sender, page){
		var line,values, start = (page - 1) * this.maxRows, finish = (start + this.maxRows > this.dataUpload.rows.length ? this.dataUpload.rows.length:start + this.maxRows);		
		this.sg1.clear();
		this.sg1.showLoading();
		for (var i = start; i < finish;i++){
			line = this.dataUpload.rows[i];			
			values = [];
			for (var c in line) values.push(line[c]);
			this.sg1.appendData(values);
		}
		this.sg1.setNoUrut(start);
		this.sg1.hideLoading();
	},
	doSelectedDate: function(sender, y,m,d){
		this.ed_periode.setText(y+""+(m < 10 ? "0"+m:m));	
	}
});
