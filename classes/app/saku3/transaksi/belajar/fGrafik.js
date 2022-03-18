window.app_saku3_transaksi_belajar_fGrafik = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_belajar_fGrafik.prototype.parent.constructor.call(this,owner);
		this.maximize();		
		
		this.className  = "app_saku3_transaksi_belajar_fGrafik";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Grafik", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		
		
		this.pc1 = new pageControl(this,{bound:[20,20,1000,440], childPage:["Daftar Grafik","Data Grafik","Filter Cari"]});//,"Filter Cari"
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:4,tag:9, 
		            colTitle:["Kode","Nama","Modul","Format Nominal"],
					colWidth:[[3,2,1,0],[100,80,200,80]],					
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
        
        this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"Kode",maxLength:10,change:[this,"doChange"]});		
        this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,300,20],caption:"Nama", maxLength:50, tag:1});				
		this.e_modul = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,200,20],caption:"Modul",maxLength:10, tag:1});
		this.c_format = new saiCB(this.pc1.childPage[1],{bound:[20,14,200,20],caption:"Format Nominal",items:["Satuan","Ribuan","Jutaan"], readOnly:true,tag:2});
		this.cb_fs = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,15,220,20],caption:"Kode FS",multiSelection:false,change:[this,"doChange"]});					
		
        
        this.cb_kode2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,10,200,20],caption:"Kode",maxLength:10,tag:2});
        this.bLoad = new button(this.pc1.childPage[2],{bound:[120,12,80,18],caption:"Cari Data",click:[this,"doCari"]});	
		
		this.pc2 = new pageControl(this.pc1.childPage[1],{bound:[1,30,this.pc1.width-4,this.pc1.height-155], childPage:["Detail"]});
		this.sg2 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:2,tag:0,
		            colTitle:["Kode Neraca","Nama Neraca"],
					colWidth:[[1,0],[400,100]],
					buttonStyle:[[0],[bsEllips,bsEllips]],	
					autoAppend:true,defaultRow:1,
					ellipsClick:[this,"doEllipsClick2"],
					change:[this,"doChangeCell2"]
					});		
		this.sgn2 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sg2});
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);			
		this.pc1.childPage[2].rearrangeChild(10, 23);	
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbAllFalse);
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
            this.doLoad();
            this.stsSimpan = 1;
			
			var sql = new server_util_arrayList();

			this.cb_fs.setSQL("select kode_fs, nama from fs where kode_lokasi='"+this.app._lokasi+"'",["kode_fs","nama"],false,["Kode","Nama"],"and","Data FS",true);

            sql.add("select distinct kode_neraca,nama from neraca where kode_lokasi='"+this.app._lokasi+"'");
			this.dbLib.getMultiDataProviderA(sql);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_belajar_fGrafik.extend(window.childForm);
window.app_saku3_transaksi_belajar_fGrafik.implement({
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
		   
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
					uses("server_util_arrayList");
                    var sql = new server_util_arrayList();	
                    
                    if(this.stsSimpan == 0){
                        sql.add("delete from db_grafik_m where kode_grafik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
					    sql.add("delete from db_grafik_d where kode_grafik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
                    }
					sql.add("insert into db_grafik_m(kode_grafik, kode_lokasi, nama, modul, format) values "+
							"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.e_modul.getText()+"','"+this.c_format.getText()+"')");
					
					var nu=1;
					
					for (var i=0;i < this.sg2.getRowCount();i++){
						if (this.sg2.rowValid(i)) { 
							sql.add("insert into db_grafik_d(kode_grafik,kode_lokasi,kode_neraca,kode_fs,nu) values ('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.cb_fs.getText()+"',"+nu+")");
							nu++;
						}
					}							
					
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from db_grafik_m where kode_grafik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from db_grafik_d where kode_grafik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.cb_kode);
					setTipeButton(tbAllFalse);
					this.doLoad();
				}
				break;
			case "simpan" :	
            case "ubah" :	
				this.simpan();
				break;						
			case "simpancek" : this.simpan();			
				break;		
			case "hapus" :	
				this.hapus();
				break;				
		}
    },
	doChange: function(sender){
		try{
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				var strSQL = "select a.kode_grafik,a.nama,a.modul,a.format,b.kode_fs "+
				             "from db_grafik_m a inner join db_grafik_d b on a.kode_grafik=b.kode_grafik and a.kode_lokasi=b.kode_lokasi where a.kode_grafik ='"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";						   				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);
						this.e_modul.setText(line.modul);
						this.c_format.setText(line.format);
						this.cb_fs.setText(line.kode_fs);
						var strSQL = "select a.kode_grafik, a.kode_neraca,b.nama as nama_nrc ,a.kode_fs,c.nama as nama_fs "+
                                     "from db_grafik_d a "+
                                     "inner join neraca b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi and a.kode_fs=b.kode_fs "+
                                     "inner join fs c on a.kode_fs=c.kode_fs and a.kode_lokasi=c.kode_lokasi "+
									 "where a.kode_grafik = '"+this.cb_kode.getText()+"' and a.kode_lokasi="+this.app._lokasi;					
						var data = this.dbLib.getDataProvider(strSQL,true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sg2.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];							
								this.sg2.appendData([line.kode_neraca,line.nama_nrc]);
							}
                        } else this.sg2.clear(1);
                        this.stsSimpan = 0;
						setTipeButton(tbUbahHapus);
					}
					else{
                        this.standarLib.clearByTag(this, new Array("1"),undefined);
                        this.stsSimpan = 1;
						setTipeButton(tbSimpan);
					}
				}
			}	
			if (sender == this.cb_fs && this.cb_fs.getText() != ""){

			}
						
		}catch(e){
			systemAPI.alert(e);
		}
	},			
	doEllipsClick2: function(sender, col, row){
		try{			
			if (sender == this.sg2) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Neraca",sender,undefined, 
						    "select distinct kode_neraca,nama from neraca where kode_lokasi='"+this.app._lokasi+"' and kode_fs='"+this.cb_fs.getText()+"' ",
							"select count(distinct kode_neraca) from neraca where kode_lokasi='"+this.app._lokasi+"' and kode_fs='"+this.cb_fs.getText()+"' ",
							["kode_neraca","nama"],"and",["Kode","Nama"],false);				
                }
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	
	doChangeCell2: function(sender, col, row){
		sender.onChange.set(undefined,undefined);	    
		if (col == 0) {
			if (this.sg2.cells(0,row) != "") {				
				var nrc = this.dataNeraca.get(sender.cells(0,row));				
				if (nrc) { 
					sender.cells(1,row,nrc);

				}
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Neraca "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkNrc");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}				
			}
        }
      
		sender.onChange.set(this,"doChangeCell2");		
	},
		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses terseksekusi (Kode : "+ this.cb_kode.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataNrc = new portalui_arrayMap();							
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataNrc.set(line.kode_grafik, line.nama);					
								}								
                            }					
						}else throw result;
					break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doCari:function(sender){								
		try {
            var filter='';
			if (this.cb_kode2.getText() != "") {
				filter = " kode_grafik like '%"+this.cb_kode2.getText()+"%' ";
			}
			
			if(filter != ''){
				var strSQL = "select kode_grafik,nama,modul,format from db_grafik_m "+	
						 "where "+filter+" and kode_lokasi='"+this.app._lokasi+"' ";
			}else{
				var strSQL = "select kode_grafik,nama,modul,format from db_grafik_m where kode_lokasi='"+this.app._lokasi+"' ";
			}
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[0]);
		} 
		catch(e) {
			alert(e);
		}
	},
	doLoad:function(sender){								
		try {			
			var strSQL = "select kode_grafik,nama,modul,format from db_grafik_m where kode_lokasi='"+this.app._lokasi+"'";	
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[0]);			
		} 
		catch(e) {
			alert(e);
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
			this.sg1.appendData([line.kode_grafik,line.nama,line.modul,line.format]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_kode.setText(this.sg1.cells(0,row));	
			}
		} catch(e) {alert(e);}
	},
	doCloseReportClick: function(sender){
		switch(sender.getName()){
			case "PreviewBtn" :        
				window.open(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
			break;
			case "PrintBtn" :
				this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
				try
				{
					window.frames[this.viewer.getFullId() +"_iframe"].focus();
					window.frames[this.viewer.getFullId() +"_iframe"].print();
				}catch(e)
				{alert(e);}
			break;
			default :				
				this.pc1.show();   
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  			
			break;
		}
	},
});