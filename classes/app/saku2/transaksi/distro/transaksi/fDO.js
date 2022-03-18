window.app_saku2_transaksi_distro_transaksi_fDO = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_distro_transaksi_fDO.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_distro_transaksi_fDO";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form BAST DO: Input", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;pageControl;saiGrid;sgNavigator;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new saiLabelEdit(this,{bound:[20,13,225,20],caption:"No Dokumen", maxLength:50});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,14,450,20],caption:"Keterangan", maxLength:150});						
		this.cb_po = new saiCBBL(this,{bound:[20,17,245,20],caption:"No PO", multiSelection:false, maxLength:10, change:[this,"doChange"]});				
		this.e_total = new saiLabelEdit(this,{bound:[720,17,200,20],caption:"Total Vol (ltr)", tag:1, tipeText:ttNilai, text:"0", readOnly:true});		
		
		this.p1 = new panel(this,{bound:[20,23,900,293],caption:"Detail PO"});
		this.sg = new saiGrid(this.p1,{bound:[1,20,this.p1.width-5,this.p1.height-50],colCount:5,tag:0,
		            colTitle:["No SO","Item Barang","Keterangan","Nama Cust","Volume(ltr)"],
					colWidth:[[4,3,2,1,0],[100,200,200,200,150]],					
					readOnly:true,					
					colFormat:[[4],[cfNilai]],checkItem:true,
					nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height-25,this.p1.width-1,25],buttonStyle:3,grid:this.sg});		
		
		this.rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_distro_transaksi_fDO.extend(window.childForm);
window.app_saku2_transaksi_distro_transaksi_fDO.implement({
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
	simpan: function(){			
		try{						
			this.doClick(this.i_gen);
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("update ds_po_m set no_do='"+this.e_nb.getText()+"' where no_po='"+this.cb_po.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("insert into ds_do_m(no_do,kode_lokasi,periode,tanggal,no_dokumen,keterangan,tgl_input,nik_user,no_po,tgl_terima,jam,stok,densiti,total,harga,akun_hutang) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"',getdate(),'"+this.app._userLog+"','"+this.cb_po.getText()+"','"+this.dp_d1.getDateString()+"','00-00-00',"+parseNilai(this.e_total.getText())+",0,"+parseNilai(this.e_total.getText())+",0,'-')");					
					setTipeButton(tbAllFalse);					
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);														
					setTipeButton(tbSimpan);
					this.doClick(this.i_gen);
					this.cb_po.setSQL("select no_po, no_dokumen from ds_po_m where periode<='"+this.e_periode.getText()+"' and no_do='-' and kode_lokasi='"+this.app._lokasi+"'",["no_po","no_dokumen"],false,["No Bukti","No PO"],"and","Data PO",true);			
					this.sg.clear(1);					
				break;
			case "simpan" :													
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);				
				if (nilaiToFloat(this.e_total.getText()) == 0) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
					return false;						
				}
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())){
					if (this.app._pernext == "1")
					  system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
					else{
						system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
						return false;
					}
				} 
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}
		this.cb_po.setSQL("select no_po, no_dokumen from ds_po_m where periode<='"+this.e_periode.getText()+"' and no_do='-' and kode_lokasi='"+this.app._lokasi+"'",["no_po","no_dokumen"],false,["No Bukti","No PO"],"and","Data PO",true);			
		this.doClick(this.i_gen);
	},	
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"ds_do_m","no_do",this.app._lokasi+"-TAP"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_dok.setFocus();
		}		
	},		
	doChange:function(sender){
		if (sender == this.cb_po && this.cb_po.getText()!="") {
			var strSQL = "select a.no_so,a.item_brg,a.catatan,b.nama as nama_cust,a.vol from ds_so_m a inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi "+
			             "where a.no_po='"+this.cb_po.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.no_so,line.item_brg,line.catatan,line.nama_cust,floatToNilai(line.vol)]);
				}
			} else this.sg.clear(1);
		}
	},	
	doNilaiChange: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(4,i) != ""){
					tot += nilaiToFloat(this.sg.cells(4,i));					
				}
			}									
			this.e_total.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1) {
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Bukti : "+ this.e_nb.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});
