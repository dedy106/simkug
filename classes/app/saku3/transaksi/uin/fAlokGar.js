window.app_saku3_transaksi_uin_fAlokGar = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_uin_fAlokGar.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_uin_fAlokGar";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Alokasi Anggaran", 0);	
		
		uses("portalui_uploader;saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.c_tahun = new portalui_saiLabelEdit(this,{bound:[20,22,200,20],caption:"Tahun Budget",readOnly:true,tag:2});		
		this.e_belanja = new saiLabelEdit(this,{bound:[20,15,200,20],caption:"Total Belanja", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});					
		this.e_pdpt = new saiLabelEdit(this,{bound:[20,16,200,20],caption:"Total Pendapatan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});					

		this.pc1 = new pageControl(this,{bound:[20,10,700,350], childPage:["Alokasi Budget"]});				
		this.sg = new portalui_saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-33],colCount:4,tag:0,
		            colTitle:["Kode Fak/Unit","Nama Fak/Unit","Total Belanja","Total Pdpt"],
					colWidth:[[3,2,1,0],[100,100,250,100]],					
					columnReadOnly:[true,[0,1],[2,3]],
					colFormat:[[2,3],[cfNilai,cfNilai]],		
					change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],								
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});				
		
		this.rearrangeChild(10, 23);
					
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();				
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
							
			var data = this.dbLib.getDataProvider("select tahun from uin_tahun where flag_aktif='1' order by tahun desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.c_tahun.setText(line.tahun);				
			}

			this.doLoad();
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_uin_fAlokGar.extend(window.childForm);
window.app_saku3_transaksi_uin_fAlokGar.implement({	
	doLoad: function() {
		try {
			var strSQL = "select a.kode_pp,a.nama,isnull(b.belanja,0) as belanja,isnull(b.pdpt,0) as pdpt "+
						"from pp a "+					
						"left join ( "+
							"select kode_pp,kode_lokasi,belanja,pdpt "+
							"from uin_alokasi_m "+
							"where tahun='"+this.c_tahun.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+						
						") b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+					
						"where a.kode_lokasi ='"+this.app._lokasi+"' and a.flag_aktif='1'";

			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.kode_pp,line.nama,floatToNilai(line.belanja),floatToNilai(line.pdpt)]);
				}
				this.sg.validasi();
			} else this.sg.clear(1);
		}
		catch(e) {
			alert(e);
		}
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("delete from uin_alokasi_m where tahun = '"+this.c_tahun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					if (this.sg.getRowValidCount() > 0){						
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)) {
								sql.add("insert into uin_alokasi_m(tahun,kode_pp,kode_lokasi,belanja,pdpt) values "+
										"('"+this.c_tahun.getText()+"','"+this.sg.cells(0,i)+"','"+this.app._lokasi+"',"+nilaiToFloat(this.sg.cells(2,i))+","+nilaiToFloat(this.sg.cells(3,i))+")");										
							}
						}
					}
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
					this.standarLib.clearByTag(this, new Array("0","1"),undefined);
					this.sg.clear(1); 
					setTipeButton(tbSimpan);
					this.doLoad();
				break;
			case "simpan" :																					
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},
	doChangeCell: function(sender, col, row){
		if (col == 2 || col == 3) this.sg.validasi();
	},		
	doNilaiChange: function(){
		try{
			var belanja=pdpt=0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(2,i) != "" && this.sg.cells(3,i) != ""){					
					belanja += nilaiToFloat(this.sg.cells(2,i));
					pdpt += nilaiToFloat(this.sg.cells(3,i));					
				}
			}
			this.e_belanja.setText(floatToNilai(belanja));			
			this.e_pdpt.setText(floatToNilai(pdpt));			
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
						if (result.toLowerCase().search("error") == -1){
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi.");							
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