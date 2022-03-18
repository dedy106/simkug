window.app_saku3_transaksi_rtrw_versi2_fKartuWajib = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_rtrw_versi2_fKartuWajib.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_rtrw_versi2_fKartuWajib";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Generate Iuran Wajib", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.cb_jenis = new saiCBBL(this,{bound:[20,11,220,20],caption:"Jenis Iuran", multiSelection:false, maxLength:10, tag:2, change:[this,"doChange"]});				
		this.e_tahun = new portalui_saiLabelEdit(this,{bound:[20,12,200,20],caption:"Tahun Iuran",  tag:1});//readOnly:true,
		this.c_bulan1 = new saiCB(this,{bound:[20,13,200,20],caption:"Bulan Awal",items:["01","02","03","04","05","06","07","08","09","10","11","12"], readOnly:true,tag:2});
		this.c_bulan2 = new saiCB(this,{bound:[20,14,200,20],caption:"Bulan Akhir",items:["01","02","03","04","05","06","07","08","09","10","11","12"], readOnly:true,tag:2});
		this.cb_pp = new saiCBBL(this,{bound:[20,11,220,20],caption:"RT", multiSelection:false, maxLength:10, tag:2, change:[this,"doChange"]});				
		this.e_rt = new portalui_saiLabelEdit(this,{bound:[20,16,200,20],caption:"Iuran RT", maxLength:10, tipeText:ttNilai,tag:2, text:"0"});																
		this.e_rw = new portalui_saiLabelEdit(this,{bound:[20,15,200,20],caption:"Iuran RW", maxLength:10, tipeText:ttNilai,tag:2, text:"0"});																
		this.bTampil = new portalui_button(this,{bound:[238,15,80,18],caption:"Gen Kartu",click:[this,"doGen"]});		

		this.pc3 = new pageControl(this,{bound:[20,22,1000,320], childPage:["Data Kartu"]});		
		this.sg1 = new saiGrid(this.pc3.childPage[0],{bound:[1,5,995,285],colCount:5,tag:9,		            
				colTitle:["No Rumah","Penghuni","Nilai RT","Nilai RW","Total"],
				colWidth:[[4,3,2,1,0],[100,100,100,200,100]],
				colFormat:[[2,3,4],[cfNilai,cfNilai,cfNilai]],
				columnReadOnly:[true,[0,1,4],[2,3]],
				change:[this,"doChangeCell"], nilaiChange:[this,"doNilaiChange"],
				autoAppend:false,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc3.childPage[0],{bound:[1,this.pc3.height-25,this.pc3.width-1,25],buttonStyle:3,grid:this.sg1});	
		
		
		this.rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.cb_jenis.setSQL("select kode_jenis,nama from rt_iuran_jenis where jenis='REGULER' and kode_lokasi='"+this.app._lokasi+"'",["kode_jenis","nama"],false,["Kode","Nama"],"and","Data Iuran",true);			
			this.cb_pp.setSQL("select a.kode_pp,a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							  "where b.nik='"+this.app._userLog+"' and b.kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data RT",true);			
			
			this.cb_pp.setText(this.app._kodePP);
			this.e_rt.setText("25.000");
			this.e_rw.setText("125.000");

			this.c_bulan1.setText("01");
			this.c_bulan2.setText("12");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_rtrw_versi2_fKartuWajib.extend(window.portalui_childForm);
window.app_saku3_transaksi_rtrw_versi2_fKartuWajib.implement({
	doGen:function(sender){
		this.sg1.clear();
		var strSQL = "select a.kode_rumah,isnull(b.nama,'-') as penghuni from rt_rumah a left join rt_warga b on a.kode_penghuni=b.nik where a.kode_lokasi='"+this.app._lokasi+"' and a.rt='"+this.cb_pp.getText()+"' ";		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;			
			for (var i in data.rs.rows){
				line = data.rs.rows[i];						
				this.sg1.appendData([line.kode_rumah, line.penghuni,this.e_rt.getText(),this.e_rw.getText(),"0"]);
				this.doChangeCell(this.sg1,2,i);
			}
		} else this.sg1.clear(1);
		this.sg1.validasi();
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
	simpan: function(){			
		try{							
			if (this.standarLib.checkEmptyByTag(this, [0,2])){
				try{													
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					this.perAwal = this.e_tahun.getText() + this.c_bulan1.getText();		
					this.perAkhir = this.e_tahun.getText() + this.c_bulan2.getText();		
					sql.add("delete from rt_bill_d where periode between '"+this.perAwal+"' and '"+this.perAkhir+"' and kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.cb_pp.getText()+"' ");
					
										
					for (var i=0;i < this.sg1.getRowCount();i++){
						if (this.sg1.rowValid(i)){										
							var blnAwal = parseInt(this.c_bulan1.getText());
							var blnAkhir = parseInt(this.c_bulan2.getText());
							var period = this.e_tahun.getText() + this.c_bulan1.getText();		
							
							for (var j=blnAwal;j <= blnAkhir;j++){												
								sql.add("insert into rt_bill_d (kode_lokasi,kode_jenis,periode,kode_rumah,kode_pp,nilai_rt,nilai_rw) values "+
										"('"+this.app._lokasi+"','"+this.cb_jenis.getText()+"','"+period+"','"+this.sg1.cells(0,i)+"','"+this.cb_pp.getText()+"', "+nilaiToFloat(this.sg1.cells(2,i))+","+nilaiToFloat(this.sg1.cells(3,i))+")");
								period = getNextPeriode(period);		
							}

						}
					}

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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0"),this.e_nb);		
					this.sg1.clear(1); 					
				}
				break;
			case "simpan" :				
				this.simpan();
				break;
			case "simpancek" : this.simpan();			
				break;								
		}
	},		
	doChange:function(sender){
		try {
			if (sender == this.cb_jenis && this.cb_jenis.getText()!="") {
				var strSQL = "select "+
							"substring(convert(varchar,tgl_mulai,112),1,4) as tahun "+
							"from rt_iuran_jenis where kode_jenis = '"+this.cb_jenis.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){	
						this.e_tahun.setText(line.tahun);					
					}
				}
			}
		}
		catch(e) {
			alert(e);
		}
	},
	doChangeCell: function(sender, col, row) {
		if ((col == 2 || col == 3) && this.sg1.cells(2,row) != "" && this.sg1.cells(3,row) != "") {			
			var tot = nilaiToFloat(this.sg1.cells(2,row)) + nilaiToFloat(this.sg1.cells(3,row));
			this.sg1.cells(4,row,tot)
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;	      		
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});